# 단계 1: 빌드 단계
FROM node:22-alpine3.20 AS build

# 작업 디렉토리 설정
WORKDIR /app

# 애플리케이션 코드 및 .env 파일 복사
COPY . .

# 의존성 설치
RUN npm ci

# 애플리케이션 빌드
RUN npm run build

# 단계 2: 실행 단계
FROM nginx:alpine

# 빌드된 파일 복사
COPY --from=build /app/dist /usr/share/nginx/html

# 필요에 따라 Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/nginx.conf

# 포트 노출
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
