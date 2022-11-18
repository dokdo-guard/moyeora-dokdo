# 포팅메뉴얼

- BE
    - SpringBoot
        
        ```jsx
        dependencies {
        	// db, jpa
        	implementation 'org.springframework.boot:spring-boot-starter-data-mongodb'
        	implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
        	implementation 'mysql:mysql-connector-java'
        	// springboot starter
        	implementation 'org.springframework.boot:spring-boot-starter-web'
        	implementation 'org.springframework.boot:spring-boot-starter-security:2.5.5'
        	implementation 'org.springframework.boot:spring-boot-starter-validation:2.5.5'
        	implementation 'org.springframework.boot:spring-boot-starter-data-jpa:2.5.5'
        	// springboot security
        	implementation 'org.springframework.security:spring-security-oauth2-client:5.5.2'
        	// jwt
        	implementation 'io.jsonwebtoken:jjwt-api:0.11.2'
        	// Swagger
        	implementation group: 'io.springfox', name: 'springfox-swagger-ui', version: '2.9.2'
        	implementation group: 'io.springfox', name: 'springfox-swagger2', version: '2.9.2'
        	// lombok
        	compileOnly 'org.projectlombok:lombok'
        	annotationProcessor 'org.projectlombok:lombok'
        	runtimeOnly 'io.jsonwebtoken:jjwt-impl:0.11.2'
        	runtimeOnly 'io.jsonwebtoken:jjwt-jackson:0.11.2'
        	testImplementation 'org.springframework.boot:spring-boot-starter-test:2.5.5'
        	testImplementation 'org.springframework.security:spring-security-test:5.5.2'
        	compileOnly 'org.projectlombok:lombok'
        	annotationProcessor 'org.projectlombok:lombok'
        	testImplementation 'org.springframework.boot:spring-boot-starter-test'
        }
        ```
        
    - MySQL
        
        ```jsx
        $ docker pull mysql
        $ docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=비밀번호 -d -p 33306:3306 mysql:latest
        ```
        
    - MongoDB
        
        ```sql
        
        # 몽고 디비 Auth 적용 X 컨테이너
        docker run --name mongodb-container -v ~/data:/data/db -d -p 37017:27017 mongo
        
        # 몽고 디비 Auth 적용 O 컨테이너
        docker run -d -p 37017:27017 -v ~/data/db:/data/db mongo mongod --auth
        
        # ~/data/db 에 MongoDB 데이터 정보를 마운트
        ```
        
    - 서버 배포
        - SSH 접속
        
        ```bash
        $ ssh -i pem키 ubuntu@도메인
        ```
        
        - 사전 패키지 설치
        
        ```bash
        $ sudo apt update
        $ sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
        ```
        
        - GPG Key 인증
        
        ```bash
        $ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
        ```
        
        - docker 설치
        - docker 버전 확인
        
        ```bash
        $ docker -v
        ```
        
        ## Jenkins 설치 및 접속
        
        👇Jenkins 접속 주소👇
        
        [http://k7d204.p.ssafy.io:9090/](http://k7d204.p.ssafy.io:9090/manage/)
        
        - docker-compose를 이용해 젠킨스 컨테이너 생성
        
        ```bash
        $ vim docker-compose.yml
        ```
        
        ```markdown
        version: '3'
        
        services:
            jenkins:
                image: jenkins/jenkins:lts
                container_name: jenkins
                volumes:
                    - /var/run/docker.sock:/var/run/docker.sock
                    - /jenkins:/var/jenkins_home
                ports:
                    - "9090:8080"
                privileged: true
                user: root
        ```
        
        위의 내용 작성 후 `:wq` 명령어로 저장하고 닫기
        
        ```bash
        $ sudo apt install docker-compose
        $ sudo docker-compose up -d
        ```
        
        - 컨테이너 생성 확인
        
        ```bash
        $ docker ps
        ```
        
        ❌ 에러!
        
        ```markdown
        Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get "http://%2Fvar%2Frun%2Fdocker.sock/v1.24/containers/json": dial unix /var/run/docker.sock: connect: permission denied
        ```
        
        👉 해결(권한 문제)
        
        ```bash
        $ sudo usermod -aG docker $USER
        $ newgrp docker
        ```
        
        - Jenkins 브라우저 접속
            
            초기 비밀번호 입력 후 `Install suggested plugins` 클릭
            
            👉 이슈 발생
            
            기본적으로 설치되야하는 플러그인들이 설치가 안됐다.
            
            알고보니 방화벽 설정 문제!
            
            방화벽 설정 해제하고 시간을 두고 수동으로 플러그인을 설치하니까 해결됐다.
            
        - Jenkins 계정 생성
            
            설치가 끝나면 `Create First Admin User` 폼이 뜬다.
            
            `Save and Finish`
            
            `Start using Jenkins`
            
        - 플러그인 설치
            - 설치 가능 탭에서 검색어에 `gitlab`을 입력
                
                `GitLab`, `Generic Webhook Trigger`, `Gitlab API`, `GitLab`, `Authentication`을 체크하고 `Install without restart` 클릭
                
            - 검색어에 `docker` 입력
                
                같은 방식으로 `Docker`, `Docker Commons`, `Docker Pipeline`, `Docker API`
                
            - SSH 관련 플러그인 `Publish Over SSH`까지 설치
            
        
        ## 젠킨스 WebHook 설정
        
        - Gitlab 레포지토리 폴더 구조 변경
            
            Back, Front 프로젝트
            
        - 젠킨스 메인페이지에서 `새로운 item` 클릭
            
            프로젝트 이름을 입력하고 `Freestyle project` 선택
            
        - `소스 코드 관리` 탭 클릭
            
            None에 체크되어있는 것을 Git으로 바꾸고 `Repository URL`에 싸피깃 레포지토리 URL을 입력한다. (빨간 에러 메세지가 뜨는데 지금 단계에서는 정상이다.)
            
            - `Credentials`에서 `+ Add` 클릭
                
                `Add Credentials` 폼에서 Username에 싸피깃 아이디, Password에는 싸피깃 비밀번호, ID에는 Credential을 구분할 수 있는 아무 문자를 입력한다.
                
                입력이 끝나면 `Add`를 클릭하고 `Credentials`에서 생성한 credential을 선택
                
                (오류 메세지가 사라졌으면 성공)
                
        - `빌드 유발` 탭 이동
            
            빌드 유발 탭에서 `Build when a change ~` , `opened Merge Request Events` 를 체크해주고 고급 버튼을 클릭합니다.
            
            아래로 스크롤을 내려 `Secret token`을 찾아 Generate 버튼을 클릭하면 입력창에 토큰이 생성된다. 이 토큰은 Gitlab과 WebHook을 연결할 때 사용되니 저장해두자.
            
        - `Build Steps`탭으로 이동
            
            `Add build step`을 클릭하고 `Execute Shell`을 선택
            
            명령어를 입력할 수 있는 칸이 나타나면 일단 테스트만 하는 것이기 때문에 pwd를 입력
            
            여기까지 완료했으면 저장
            
        
        - `지금 빌드` 클릭
            
            일단 수동 빌드를 진행해보자.
            
            완료 표시가 뜨면 성공
            
            빌드 히스토리에서 `Console Output`에 들어가보면 입력했던 명령어 pwd도 잘 작동한 것을 확인할 수 있다.
            
        - Gitlab WebHook 연결
            
            gitlab 레포지토리 이동
            
            `Settings` → `WebHooks` 페이지로 이동
            
            URL에는 `http://서버IP:9090/project/jenkins프로젝트이름/`을 입력한다.
            
            Secret token에는 아까 젠킨스 프로젝트를 생성할 때 저장해둔 값을 입력한다.
            
            Trigger로 `Push events`, `Merge request events` 체크. 대상 Branch는 develop으로 설정한다.
            
            여기까지 완료했다면 Add Webhook 버튼을 눌러 webhook을 생성하자.
            
            webhook을 생성하고 나면 빌드테스트를 위해 생성된 webhook에서 test를 누르고 Push events 클릭, 응답이 잘넘어갔다면 `HTTP 200`으로 응답코드가 온다.
            
            젠킨스에서도 정상적으로 빌드가 수행된 것을 확인할 수 있다.
            
        
        **여기까지 완료했으면 Jenkins와 Gitlab이 연결되었다.**
        연결된 Gitlab의 master branch에 이벤트가 발생하면, 젠킨스에서 빌드를 수행하게 된다.
        
        ## Docker in Docker
        
        Jenkins 컨테이너 안에 도커를 설치하자. 도커 설치 방법은 EC2에 도커를 설치할 때와 동일하게 진행한다.
        
        먼저 Jenkins bash shell에 접근해보자.
        
        ```bash
        $ sudo docker exec -it jenkins bash
        ```
        
        이제 해당 환경에서 docker를 다시 설치하자.
        
        - 사전 패키지 설치
        
        ```bash
        # apt update
        
        # apt-get install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common
        ```
        
        - GPG Key 다운로드
        
        젠킨스에 gpg key를 다운로드 받을 때의 변경사항
        
        ```bash
        # mkdir -p /etc/apt/keyrings
        
        # curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
        
        # echo \
            "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
            $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
        ```
        
        ```bash
        # cat /etc/issue
        ```
        
        젠킨스 컨테이너 내부에서 설치된 os를 체크하는 명령어를 통해 os를 확인해보면 `debian`으로 나타나는 것을 확인할 수 있다.
        
        기존 링크에서 제공한 방식은 `ubuntu os`에 대한 gpg 키를 다운로드 하는 것이기 때문에, 이를 `debian`으로 바꿔줘야 한다. 이를 바꾸지 않으면 패키지를 찾지 못하는 에러가 발생
        
        기존 명령어에서 `ubuntu`로 되어있는 부분은 `debian`으로 바꿔주면 된다.(초반 패키지 설치 내용 참고)
        
        - Docker 설치
        
        ```bash
        # apt update
        
        # apt install docker-ce docker-ce-cli containerd.io docker-compose
        ```
        
        - root 계정 로그아웃
        
        ```bash
        # exit
        ```
        
        ## DockerFile 작성 및 이미지 생성
        
        각 프로젝트 폴더에 Dockerfile을 만들자.
        
        ```docker
        # Back/SpringBoot
        
        FROM openjdk:8 as builder
        COPY gradlew .
        COPY gradle gradle
        COPY build.gradle .
        COPY settings.gradle .
        COPY src src
        RUN chmod +x ./gradlew
        RUN ./gradlew bootJar
        
        VOLUME /tmp
        
        FROM openjdk:8
        COPY --from=builder build/libs/*.jar app.jar
        
        EXPOSE 8443
        
        # 배포용 properties 실행 명령어
        # ENTRYPOINT ["java","-jar","/app.jar","--spring.config.name=application-prod"] 
        
        # 만약 배포용 properties를 사용하지 않는다면
        # Default properties 실행 명령어
        ENTRYPOINT ["java","-jar","app.jar"]
        ```
        
        ```docker
        # Front/React
        
        FROM node:16-alpine as build-stage
        WORKDIR /var/jenkins_home/workspace/dokdo/Front
        COPY package*.json ./
        RUN npm install --force
        COPY . .
        RUN npm run build
        
        FROM nginx:stable-alpine as production-stage
        COPY --from=build-stage /var/jenkins_home/workspace/dokdo/Front/build /usr/share/nginx/html
        # nginx.conf 작성 후, 주석 해제
        # COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
        
        EXPOSE 80
        CMD ["nginx", "-g", "daemon off;"]
        ```
        
        이제 Dockerfile을 이용해 Jenkins에서 이미지를 생성하도록 하자.
        
        젠킨스에 들어가서 `구성`버튼을 클릭
        
        `Build Steps` 탭으로 이동해서 명령어 창에 아래와 같이 입력한다.
        
        ```bash
        docker image prune -a --force
        mkdir -p /var/jenkins_home/images_tar
        
        cd /var/jenkins_home/workspace/dokdo/Front/
        docker build -t react .
        docker save react > /var/jenkins_home/images_tar/react.tar
        
        cd /var/jenkins_home/workspace/dokdo/Back/
        docker build -t springboot .
        docker save springboot > /var/jenkins_home/images_tar/springboot.tar
        
        ls /var/jenkins_home/images_tar
        ```
        
        - 확인
        
        ```bash
        $ cd /jenkins/images_tar
        $ ls
        ```
        
        react.tar 파일과 springboot.tar 파일이 생성된 것을 확인할 수 있다.
        
        여기까지 확인하면 젠킨스에서 도커 이미지를 빌드하여 tar 압축파일로 생성하는 부분까지 완료되었다.
        
        ## 빌드한 도커 이미지로 컨테이너 생성하기
        
        다시 젠킨스로 돌아가서, `구성`버튼을 클릭
        
        `Build Steps` 탭으로 이동해서 명령어 창에 아래의 내용을 추가한다.
        
        ```bash
        if (docker ps | grep "react"); then docker stop react; fi
        docker run -it -d --rm -p 3000:80 --name react react
        
        if (docker ps | grep "springboot"); then docker stop springboot; fi
        docker run -it -d --rm -p 8443:8443 --name springboot springboot
        
        docker rmi $(docker images -f "dangling=true" -q)
        ```
        
        Docker와 Jenkins를 이용한 **CI/CD 자동배포 완료**
        
        ## Nginx 설정 default.conf
        
        ```bash
        server {
                listen 80 default_server;
                listen [::]:80 default_server;
        
                root /var/www/html;
        
                # Add index.php to the list if you are using PHP
                index index.html index.htm index.nginx-debian.html;
        
                server_name k7d204.p.ssafy.io;
        
                location / {
                        return 301 https://$server_name$request_uri;
                }
        
        }
        
        server {
        
                root /var/www/html;
        
                index index.html index.htm index.nginx-debian.html;
                server_name k7d204.p.ssafy.io; # managed by Certbot
        
                location / {
                        proxy_pass http://localhost:3000;
                }
        
        				location ~ ^/(swagger|webjars|configuration|swagger-resources|v2|csrf) {
                       proxy_pass http://localhost:8443;
                       proxy_set_header Host $host;
                       proxy_set_header X-Real-IP $remote_addr;
                       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                       proxy_set_header X-Forwarded-Proto $scheme;
                }
        
                location /api {
                        proxy_pass http://localhost:8443;
                }
        
        				location /test {
                        proxy_pass http://localhost:3001;
                }
        
        				listen [::]:443 ssl ipv6only=on; # managed by Certbot
                listen 443 ssl; # managed by Certbot
                ssl_certificate /etc/letsencrypt/live/k7d204.p.ssafy.io/fullchain.pem; # managed by Certbot
                ssl_certificate_key /etc/letsencrypt/live/k7d204.p.ssafy.io/privkey.pem; # managed by Certbot
                include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
                ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
        
        }
        ```
        
- FE
    - npm
        
        ```jsx
        npm i
        npm start
        ```
        
        package.json에 설치된 모든 npm list를 `npm i` 명령어를 통해 설치한 후, `npm start`로 서버를 실행한다.