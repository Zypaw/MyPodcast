
# ICT171 Web Server Deployment Documentation

  

**Student Name:** Matteo Dupond

**Student Number:** 35610507

**Global IP Address:** 52.64.90.30

**DNS Entry:**  podcast.matteodupond.fr

  

---

  

## 📂 Repository and Links

  

-  **GitHub Repository:** [github.com/Zypaw/MyPodcast](https://github.com/Zypaw/MyPodcast)

-  **Live Website:** [podcast.matteodupond.fr](https://podcast.matteodupond.fr)

-  **Video Explainer:** [link](https://www.youtube.com/watch?v=H00Ufldhuh)

  

---

  

## 🧰 Technologies Used

  

- AWS EC2 (Ubuntu Server)

- React + Vite + Tailwind (Frontend)

- Apache2 (Web server)

- Certbot with Let's Encrypt (HTTPS/SSL)

  

---

  

## 🚀 Full Setup Instructions

  

### Step 1: Launch EC2 Instance 🛫 

  

1. Go to AWS EC2 Dashboard.

2. Launch a new Ubuntu Server instance (recommend `Ubuntu 22.04 LTS`).

3. Open the following ports in the security group:

- HTTP (80)
- HTTPS (443)
- SSH (22)
- Custom TCP (3001) for the newsletter API


4. Assign or create an Elastic IP and associate it with your EC2 instance.

  

---

  

### Step 2: Connect via SSH 🔐

  

Use your terminal or any SSH client:

  

```bash

ssh  -i  your-key.pem  ubuntu@YOUR.EC2.IP.ADDRESS

```

  

### Step 3: Install Node.js and npm 📦

  

```bash
sudo  apt  update
sudo  apt  install  nodejs  npm  -y

node  -v
npm  -v
```

  

### Step 4: Clone the Website 📁 

  

```bash
git  clone  https://github.com/Zypaw/MyPodcast.git
cd  MyPodcast
```

  

### Step 5: Install Dependencies and Build the App 🏗️ 

  

```bash
npm  install
npm  run  build
```

  

### Step 6: Install and Configure Apache2 🌍 

  

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

  

### Step 7: Link a Domain 🌐


To use a custom domain, update your DNS A record:

  

Type: A

  

- Name: podcast.matteodupond.fr

- Value: 52.64.90.30

  

Wait for propagation (may take a few minutes to a few hours).

  

### Step 8: Secure Your Site with HTTPS 🔒 

  

```bash
sudo  apt  install  certbot  python3-certbot-apache  -y
sudo  certbot  --apache  -d  podcast.matteodupond.fr
```

Follow the prompts to:

- Enable HTTPS
- Redirect HTTP to HTTPS
- Auto-renew the certificate

> Test by visiting: `https://podcast.matteodupond.fr`

### Step 9: Run the Newsletter API 📬
**1 : Create a Service File**  
```bash
sudo nano /etc/systemd/system/newsletter-server.service
```
paste the following
```
[Unit]
Description=Newsletter Node.js Server
After=network.target

[Service]
WorkingDirectory=/home/ubuntu/MyPodcast
ExecStart=/usr/bin/npm run server
Restart=always
User=ubuntu
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

**2 : Enable and Start the Service**
```bash
sudo systemctl daemon-reexec
sudo systemctl daemon-reload
sudo systemctl enable newsletter-server
sudo systemctl start newsletter-server
```

**3 : Check the Status**
```bash
sudo systemctl status newsletter-server
```

### Step 10: Enable Proxy to Serve API Over HTTPS 🔁
**1 : Enable Apache Proxy Modules**

```
sudo a2enmod proxy
sudo a2enmod proxy_http
```

**2 : Configure Apache to Proxy `/api` Routes**

Edit your Apache SSL config
```bash
sudo nano /etc/apache2/sites-available/000-default-le-ssl.conf
```
Replace content by
```
<IfModule mod_ssl.c>
<VirtualHost *:443>
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/html/podcast

    ServerName podcast.matteodupond.fr

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined

    Include /etc/letsencrypt/options-ssl-apache.conf
    SSLCertificateFile /etc/letsencrypt/live/podcast.matteodupond.fr/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/podcast.matteodupond.fr/privkey.pem

    ProxyPreserveHost On
    ProxyPass /api/ http://localhost:3001/api/
    ProxyPassReverse /api/ http://localhost:3001/api/

</VirtualHost>
</IfModule>
```
Restart Apache and then test directly to submit a mail on the website
```bash
sudo systemctl restart apache2
```

## 🏗️ How to put the website in Maintenance ?

### Step 1 : Create a maintenance page 🧾
```bash
sudo nano /var/www/html/maintenance.html
```
Paste this : 
```bash
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Maintenance</title>
</head>
<body>
  <h1>🚧 Site Under Maintenance</h1>
  <p>We’ll be back shortly. Thank you for your patience.</p>
</body>
</html>
```
### Step 2 : Add config to apache 🛠️
```bash
sudo nano /etc/apache2/sites-available/maintenance.conf
```
Paste this :
```bash
<VirtualHost *:80>
    ServerName podcast.matteodupond.fr
    RedirectMatch 302 ^/$ /maintenance.html
    DocumentRoot /var/www/html
</VirtualHost>
```

```bash
sudo nano /etc/apache2/sites-available/maintenance-ssl.conf
```
Paste this :
```bash
<IfModule mod_ssl.c>
<VirtualHost *:443>
    ServerName podcast.matteodupond.fr

    DocumentRoot /var/www/html
    RedirectMatch 302 ^/$ /maintenance.html

    Include /etc/letsencrypt/options-ssl-apache.conf
    SSLCertificateFile /etc/letsencrypt/live/podcast.matteodupond.fr/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/podcast.matteodupond.fr/privkey.pem
</VirtualHost>
</IfModule>
```
### Manually enable/disable Maintenance ⌨️

You can use this command to put the website in Maintenance mode
```bash
sudo a2dissite 000-default.conf
sudo a2dissite 000-default-le-ssl.conf
sudo a2ensite maintenance.conf
sudo a2ensite maintenance-ssl.conf
sudo systemctl reload apache2
```
You can use this command to put the website back on 
```bash
sudo a2dissite maintenance.conf
sudo a2dissite maintenance-ssl.conf
sudo a2ensite 000-default.conf
sudo a2ensite 000-default-le-ssl.conf
sudo systemctl reload apache2
```
## Setup cron job to automaticaly put the website in maintenance every Sunday 📆

```bash
sudo crontab -e
```

**🕑 Enable Maintenance Mode Every Sunday at 2:00 AM**
```bash
0 2 * * 0 /usr/bin/sudo /usr/sbin/a2dissite 000-default.conf && /usr/bin/sudo /usr/sbin/a2dissite 000-default-le-ssl.conf && /usr/bin/sudo /usr/sbin/a2ensite maintenance.conf && /usr/bin/sudo /usr/sbin/a2ensite maintenance-ssl.conf && /usr/bin/sudo /bin/systemctl reload apache2
```
**🕝 Disable Maintenance Mode Every Sunday at 2:30 AM**
```bash
30 2 * * 0 /usr/bin/sudo /usr/sbin/a2dissite maintenance.conf && /usr/bin/sudo /usr/sbin/a2dissite maintenance-ssl.conf && /usr/bin/sudo /usr/sbin/a2ensite 000-default.conf && /usr/bin/sudo /usr/sbin/a2ensite 000-default-le-ssl.conf && /usr/bin/sudo /bin/systemctl reload apache2
```
Now verify that theses jobs are registered :
```bash
sudo crontab -l
```

```bash
sudo systemctl status cron
```

## Other cron job that runs on the server

🛠️ **Restart Node.js Newsletter API Weekly Every Sunday at 2:10 AM**

```cron
10 2 * * 0 /usr/bin/systemctl restart newsletter-server
```

♻️ **Auto Rebuild Frontend Daily at 3 AM**

```cron
0 3 * * * cd /home/ubuntu/MyPodcast && /usr/bin/npm run build && cp -r dist/* /var/www/html/
```


# And there you go !

