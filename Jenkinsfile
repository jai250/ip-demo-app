pipeline {
    agent any

    environment {
        IMAGE_NAME = "jk1995/ip-demo"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage("Build Docker Image") {
            steps {
                script {
                    def image = docker.build("${IMAGE_NAME}:${IMAGE_TAG}")
                    docker.withRegistry('https://registry.hub.docker.com', 'docker_token') {
                        image.push()
                        image.push("latest")
                    }
                }
            }
        }
        stage("Deploy to App Server") {
            steps {
                sshagent(['ec2_key']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ubuntu@3.110.136.122 '
                    docker pull ${IMAGE_NAME}:${IMAGE_TAG}
                    docker stop ipapp || true
                    docker rm ipapp || true
                    docker run -d -p 3000:3000 --name ipapp ${IMAGE_NAME}:${IMAGE_TAG}
                    '
                    """
                }
            }
        }    
    }
}
