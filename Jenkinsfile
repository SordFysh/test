pipeline {
    agent any

    // to use a named agent -- do this only if you require a docker container, or your jenkins server memory is too low to do the desired build
    
    /*agent {
        label 'jenkins-agent-fleet'
    }*/
     

    environment {
        REST_JAR_FILE="skycase-website.jar"
        REST_TAR_BASE="skycase_website_rest"
        UI_TAR_BASE="skycase_website_ui"
    }

    // this triggers this build after the first time the build runs, until this script changes
    // not necessary if builds are triggered by Gitlab
    triggers {
        pollSCM('H/5 * * * *')
    }

    // list tools to be installed for the build in this environment
    tools {
        maven 'maven-3.3.9'
        nodejs 'node-8.0.0'
    }

    stages {

        stage('checkout') {
            steps {
                // deletes the workspace folder, whose path looks like this: /tmp/jenkins-5eaee705/workspace/test-pipeline
                deleteDir()
                git branch: 'master', 
                    url: 'git@gitlab.com:dukehallman/return-of-the-case.git',
                    credentialsId: 'jenkins_id_rsa'
            }
        }

        stage('ui install') {
            steps {
                dir('ui/skycase') {
                    sh 'yarn install'
                }
            }
        }

        stage('ui lint') {
            steps {
                dir('ui/skycase') {
                    sh 'npm run lint'
                }
            }
        }

        stage('ui test') {
            steps {
                dir('ui/skycase') {
                    sh 'npm test'
                }
            }
        }

        stage('ui e2e') {
            steps {
                dir('ui/skycase') {
                    echo "e2e tests require Docker container"
                    //sh 'npm run e2e'
                }
            }
        }

        stage('ui build') {
            steps {
                dir('ui/skycase') {
                    sh 'npm run build -- --prod'
                }
            }
        }

        /*stage('mvn clean package') {
            steps {
                dir('rest') {
                    sh 'mvn clean package'
                }
            }
        }*/

        stage('compress artifacts') {
            steps {
                // for groovy string-interpolation, put the entire string inside double-quotes and reference variables using the ${variable} syntax
                //sh "mv rest/target/*-SNAPSHOT.jar ${REST_JAR_FILE}"
                //sh "tar -cvzf ${REST_TAR_BASE}.tar.gz ${REST_JAR_FILE}"
                dir('ui/skycase/dist') {
                    sh "pwd"
                    sh "tar -cvzf ${UI_TAR_BASE}.tar.gz ./*"
                    sh "mv ${UI_TAR_BASE}.tar.gz ../../.."
                }
            }
        }

        stage('deploy') {

            // variables only for this stage
            environment {
                // get server private ip from credentials
                SERVER_PRIVATE_IP = credentials('skycase-private-ip')
                DEPLOY_TARGET="jenkins@${SERVER_PRIVATE_IP}"
                DEPLOY_FOLDER="/home/jenkins/skycase-website/"
                SERVICE_SCRIPT="/home/jenkins/skycase-website-service.sh"
            }
            steps {
                echo "***** scp to application server"
                sh "scp *.tar.gz ${DEPLOY_TARGET}:/tmp"

                //echo "***** deploy backend and restart service"
                //sh "ssh ${DEPLOY_TARGET} \"tar -zxvf /tmp/${REST_TAR_BASE}.tar.gz -C ${DEPLOY_FOLDER}; ${SERVICE_SCRIPT} restart\""

                echo "***** deploy frontend"
                sh "ssh ${DEPLOY_TARGET} \"tar -zxvf /tmp/${UI_TAR_BASE}.tar.gz -C /var/www/html/\""

            }

        }       
    }

    // email must be set up to send messages
    // If your build job fails in the post process, you can comment out the email notifications.
    // Also, if you use a WebHook from the Git repository, you can let the Git Repository handle failure notifications
    post {
        success {
            echo 'Build successful'
            updateGitlabCommitStatus name: 'jenkins', state: 'success'
        }

        failure { 
            emailext (
                subject: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                body: """<p>FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
                    <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>""",
                recipientProviders: [[$class: 'DevelopersRecipientProvider']]
            )
            updateGitlabCommitStatus name: 'jenkins', state: 'failed'
        }

        changed {
            echo 'Build result changed'
            script {
                if (currentBuild.result == null || currentBuild.result == 'SUCCESS') {
                    emailext (
                        subject: "SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                        body: """<p>SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
                            <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>""",
                        recipientProviders: [[$class: 'DevelopersRecipientProvider']]
                    )
                }
            }

        }
    }
}
