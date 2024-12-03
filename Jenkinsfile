pipeline {
    agent any /*{
        kubernetes {
            label 'nodejs-build-pod'
            defaultContainer 'nodejs'
            yaml """
apiVersion: v1
kind: Pod
metadata:
  labels:
    app: nodejs-build
spec:
  containers:
  - name: nodejs
    image: node:node:23.3.0-slim
    command:
    - cat
    tty: true
"""
        }
    }*/
    environment {
        S3_BUCKET = 'your-s3-bucket-name'
        AWS_DEFAULT_REGION = 'ap-northeast-2'
    }
    stages {
        /*stage('Checkout') {
            steps {
                checkout scm
            }
        }*/
        stage('Install Dependencies') {
            steps {
                container('nodejs') {
                    sh 'npm install'
                }
            }
        }
        stage('Build') {
            steps {
                container('nodejs') {
                    sh 'npm run build'
                }
            }
        }
        stage('Deploy to S3') {
            steps {
                withAWS(region: "${AWS_DEFAULT_REGION}", credentials: 'AWS_CREDENTIALS') {
                    s3Upload(
                        acl: 'PublicRead',
                        bucket: "${S3_BUCKET}",
                        path: '',
                        workingDir: 'build',
                        includePathPattern: '**/*'
                    )
                }
            }
        }
    }
    post {
        always {
            cleanWs()
            script {
                currentBuild.result = currentBuild.result ?: 'SUCCESS'
            }
            echo "Build Result: ${currentBuild.result}"
            withCredentials([string(credentialsId: 'Discord-Webhook', variable: 'DISCORD')]) {
                discordSend(
                    title: "Build Result: ${env.JOB_NAME}",
                    description: """
                    **Commit Message**: `${env.GIT_COMMIT_MESSAGE}`
                    **Commit ID**: `${env.GIT_COMMIT_SHORT}`
                    **Build Number**: `#${env.BUILD_NUMBER}`
                    **Status**: ${currentBuild.result == 'SUCCESS' ? '🟢 **Success**' : '❌ **Failure**'}
                    """,
                    webhookURL: DISCORD
                )
            }
        }
    }
}
