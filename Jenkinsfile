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
    }
}
