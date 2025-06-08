
# ICT171 Web Server Deployment Documentation

  

**Student Name:** Matteo Dupond

**Student Number:** 35610507

**Global IP Address:** 52.64.90.30

**DNS Entry:**  podcast.matteodupond.fr

  

---

  

## 📂 Repository and Links

  

-  **GitHub Repository:** [https://github.com/Zypaw/MyPodcast](https://github.com/Zypaw/MyPodcast)

-  **Live Website:** [https://podcast.matteodupond.fr](https://podcast.matteodupond.fr)

-  **Video Explainer:** [https://youtu.be/YOUR_VIDEO_ID](https://youtu.be/YOUR_VIDEO_ID)

  

---

  

## 🧰 Technologies Used

  

- AWS EC2 (Ubuntu Server)

- React + Vite + Tailwind (Frontend)

- Apache2 (Web server)

- Certbot with Let's Encrypt (HTTPS/SSL)

  

---

  

## 🛠️ Full Setup Instructions

  

### Step 1: Launch EC2 Instance

  

1. Go to AWS EC2 Dashboard.

2. Launch a new Ubuntu Server instance (recommend `Ubuntu 22.04 LTS`).

3. Open the following ports in the security group:

- HTTP (80)

- HTTPS (443)

- SSH (22)

4. Assign or create an Elastic IP and associate it with your EC2 instance.

  

---

  

### Step 2: Connect via SSH

  

Use your terminal or any SSH client:

  

```bash

ssh  -i  your-key.pem  ubuntu@YOUR.EC2.IP.ADDRESS

```

  

### Step 3: Install Node.js and npm

  

```bash
sudo  apt  update
sudo  apt  install  nodejs  npm  -y

node  -v
npm  -v
```

  

### Step 4: Clone the Website

  

```bash
git  clone  https://github.com/Zypaw/MyPodcast.git
cd  MyPodcast
```

  

### Step 5: Install Dependencies and Build the App

  

```bash
npm  install
npm  run  build
```

  

### Step 6: Install and Configure Apache2

  

```bash
sudo  apt  install  apache2  -y
sudo  ufw  allow  'Apache Full'
```

Remove default web file and replace with our App

```bash
sudo  rm  -rf  /var/www/html/*
sudo  cp  -r  dist/*  /var/www/html/
sudo  systemctl  restart  apache2
```

> You can now see the website at [52.64.90.30](52.64.90.30)

  

### Step 7: Link a Domain

To use a custom domain, update your DNS A record:

  

Type: A

  

- Name: podcast.matteodupond.fr

- Value: 52.64.90.30

  

Wait for propagation (may take a few minutes to a few hours).

  

### Step 8: Secure Your Site with HTTPS

  

```bash
sudo  apt  install  certbot  python3-certbot-apache  -y
sudo  certbot  --apache  -d  podcast.matteodupond.fr
```

Follow the prompts to:

- Enable HTTPS
- Redirect HTTP to HTTPS
- Auto-renew the certificate

> Test by visiting: `https://podcast.matteodupond.fr`

# And there you go ! 
