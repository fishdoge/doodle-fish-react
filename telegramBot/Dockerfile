# 使用官方 Node.js 映像作為基礎映像
FROM node:18

# 設置工作目錄
WORKDIR //src/

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製其餘的應用程式代碼
COPY . .

# 設置環境變數
ENV PORT=8080

# 暴露應用運行的端口
EXPOSE 8080

# 啟動應用
CMD [ "node", "index.js" ]
