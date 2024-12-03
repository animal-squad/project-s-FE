pipeline {
    agent any
    environment {
        S3_BUCKET = 'sean-local-fe-test'
    }
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/animal-squad/project-s-FE.git'
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Deploy to S3') {
            steps {
                withCredentials(region:'ap-northeast-2', credentials:'AWS_CREDENTIALS') {
                    s3Upload acl: 'PublicRead', bucket: "${env.S3_BUCKET}", path: '', workingDir: 'build', includePathPattern: '**/*'
                }
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
                discordSend title: "빌드 결과: ${env.JOB_NAME}",
                            description: """
                            **커밋 메시지**: `${env.GIT_COMMIT_MESSAGE}`
                            **커밋 ID**: `${env.GIT_COMMIT_SHORT}`
                            **빌드 번호**: `#${env.BUILD_NUMBER}`
                            **상태**: ${currentBuild.result == 'SUCCESS' ? '🟢 **성공**' : '❌ **실패**'}
                            """,
                            webhookURL: DISCORD
            }
        }
    }
}
