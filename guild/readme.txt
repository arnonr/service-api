Develop
- ตั้งค่า DB ที่ไฟล์ .env
- ใช้คำสั่ง npm run dev

ขั้นตอนการ Migrate DB
- npx prisma migrate dev --create-only
- npx prisma migrate dev --name migration-name --create-only
- ลบ REMOVE ออกถ้ามีคำสั่ง REMOVE ในไฟล์ MIGRATE
- prisma migrate dev