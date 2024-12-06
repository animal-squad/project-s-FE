pipeline {
    agent {
        kubernetes {
            defaultContainer "nodejs"
            yaml '''
apiVersion: v1
kind: Pod
spec:
    containers:
        - name: nodejs
          image: node:22.12.0-alpine
            '''

        }
    }
    environment {
        S3_BUCKET = 'linket-web-hosting-for-test'
        AWS_DEFAULT_REGION = 'ap-northeast-2'
    }
    stages {
        stage('Clean Workspace before start') {
            steps {
                cleanWs ()
            }
        }
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    env.GIT_COMMIT_SHORT = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    env.GIT_COMMIT_MESSAGE = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                    echo "Current Git Commit Short: ${env.GIT_COMMIT_SHORT}"
                    echo "Git Commit Message: ${env.GIT_COMMIT_MESSAGE}"
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy to S3') {
            steps {
                withAWS(region: "${AWS_DEFAULT_REGION}", credentials: 'AWS_CREDENTIALS') {
                    s3Upload(
                        //acl: 'PublicRead',
                        bucket: "${S3_BUCKET}",
                        path: '',
                        workingDir: 'dist',
                        includePathPattern: '**/*'
                    )
                }
            }
        }
        stage('Clean Workspace after CD') {
            steps {
                cleanWs ()
            }
        }
    }
    post {
        always {
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
