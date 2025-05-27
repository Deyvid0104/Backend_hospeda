pipeline {
    agent any

    environment {
        K8S_SERVER = "https://5.189.171.241:6443" // IP de la VPS con puerto k3s
        NAMESPACE = "default"
        DOCKER_IMAGE = 'deyvid14/hospeda_backend'
        DOCKER_TAG = "v4.${BUILD_NUMBER}"
        // Usar las credenciales guardadas en Jenkins
        DOCKER_CREDENTIALS = credentials('docker-hub')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Deyvid0104/Backend_hospeda.git'
            }
        }

        stage('Docker Login') {
            steps {
                // Usar las credenciales para hacer login
                sh '''
                    echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR --password-stdin
                '''
            }
        }

        stage('Build and Push Docker Image') {
            steps {
                script {
                    // Construir imagen Docker usando el Dockerfile
                    sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} -f deploy/Dockerfile ."
                    sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
                    
                    // Push de la imagen usando las credenciales
                    sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                    sh "docker push ${DOCKER_IMAGE}:latest"
                }
            }
        }

        stage('Verificar k3s') {
            steps {
                sh 'kubectl version --client'
                sh 'kubectl get nodes'
            }
        }

        stage('Deploy en k3s') {
            steps {
                script {
                    // Actualizar la imagen en el deployment
                    sh """
                        sed -i 's|image: deyvid14/hospeda_backend:.*|image: ${DOCKER_IMAGE}:${DOCKER_TAG}|' deploy/backend-deployment.yaml
                    """

                    // Aplicar configuraciones
                    sh """
                        kubectl apply -f deploy/backend-configmap.yaml
                        kubectl apply -f deploy/backend-secret.yaml
                        kubectl delete deploy hospeda-backend || true
                        kubectl apply -f deploy/backend-deployment.yaml
                        kubectl apply -f deploy/backend-service.yaml
                    """
                }
            }
        }
    }

    post {
        success {
            echo "Despliegue completado con éxito"
            echo "Nueva imagen desplegada: ${DOCKER_IMAGE}:${DOCKER_TAG}"
        }
        failure {
            echo "Error en el despliegue"
            echo "Revise los logs para más detalles"
        }
        always {
            // Siempre hacer logout de Docker al finalizar
            sh 'docker logout'
        }
    }
}
