pipeline {
    agent any
    environment {
        S3_BUCKET = 'sean-local-fe-test'
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
                        acl: 'PublicRead',
                        bucket: "${S3_BUCKET}",
                        path: '',
                        workingDir: 'build',
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
