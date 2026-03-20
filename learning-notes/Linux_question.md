- How do you list all files including hidden files?
    - ls -la
- A log file is updating continuously. How do you monitor it?
    - tail -f /var/log/syslog
- How do you search for a specific word inside a file?
    - grep "error" filename
- How do you search for a word recursively in multiple files?
    - grep -r "error" /var/log
    - grep -ri "error" /var/log   # Ignore case (Error, ERROR)
    - grep -rn "error" /var/log   # Show line numbers
- How do you find a file by name in Linux?
    - find . -name "file.txt"
- Find a File in Home Directory
    - find /home -name "resume.pdf"
    - find /home -iname "file.txt"  # Case-Insensitive Search
- Find Only Files
    - find /home -type f -name "file.txt"   # type -f means file, type d means directory
- How do you check disk usage on a Linux system?
    - df -h # shows filesystem usage
    - du -sh foldername # directory shows directory size, s means summry
        - ex- du -sh /var/log output- 250M /var/log
- A filesystem is full. What steps do you follow to identify the cause?
    - Check disk usage using df -h
    - Identify large directories with du -sh *
    - Remove unnecessary files or rotate logs
        - rm oldfile.log
- How do you check memory usage?
    - free -h   # Check RAM usage
    - This command shows total, used, and available memory in a human-readable format.
-  A server is slow. Which command do you run first and why?
    - top 
    - it provides real-time information about CPU, memory usage, and running processes
-  How do you view all running processes?
    - ps aux
    - This command lists all processes along with their resource usage.
- How do you terminate a process in Linux?
    - kill 2345  # kill pid
    - kill -9 2345 # -9 → forcefully terminate the process.
- How do you change file permissions?
    - chmod 755 filename
    - This gives read, write, and execute permissions to the owner and read-execute permissions to group and others.
- How do you change file ownership?
    - chown user:group filename
    - chown sagar:developers file.txt
    - This changes the owner and group of the file.
- A user gets a “Permission denied” error. What do you check?
    - Check File Permissions
        - ls -l filename
    - Check File Ownership
        - ls -l filename
        - Change owner if required:
    - Check Directory Permissions
    - Check SELinux
        - sestatus
- How do you create a new user in Linux?
    - sudo useradd username
    - sudo passwd userpassword
    - sudo useradd -m username # -m → creates a home directory like /home/sagar
    - Verify the User
        - cat /etc/passwd | grep sagar
- A user cannot log in. What possible reasons do you check?
    - cat /etc/passwd | grep username
    - Check if the Account Is Locked
        - If it shows L, the account is locked.
        - Unlock it:
            - sudo passwd -u username
    - Check Password Issues
        - Reset the password:
        - sudo passwd username
- How do you check system uptime and load average?
    ```bash
    uptime
    output- 10:30:20 up 3 days, 4:15, 2 users, load average: 0.20, 0.35, 0.40
    Field	Meaning
    10:30:20	Current system time
    up 3 days, 4:15	System has been running for 3 days and 4 hours
    2 users	Number of logged-in users
    load average	CPU load for last 1, 5, and 15 minutes
    ```
    - how long the system has been running and the load average for the last 1, 5, and 15 minutes.
- How do you schedule a task to run automatically at specific times in Linux?
```bash
crontab -e
# Open the cron scheduler:

#  * * * * * command
│ │ │ │ │
│ │ │ │ └── Day of week (0–7) (Sunday = 0 or 7)
│ │ │ └──── Month (1–12)
│ │ └────── Day of month (1–31)
│ └──────── Hour (0–23)
└────────── Minute (0–59)

# Run a script every day at 2 AM
0 2 * * * /home/sagar/backup.sh
# Run every 5 minutes
*/5 * * * * /home/sagar/script.sh
# Run every Sunday at 3 AM
0 3 * * 0 /home/sagar/cleanup.sh

# View Existing Cron Jobs
crontab -l
#  remove cronjobs
crontab -r
```
- How do you check the IP address and network interfaces on a Linux system?
    - ip addr
        - output - 2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP>
        inet 192.168.1.10/24
        - eth0  ->    Network interface name
        - inet -> IP address
        - /24 -> subnet mask
- A web service is not accessible. What do you verify first?
    - First verify whether the web service (like Apache or Nginx) is running.
        - systemctl status nginx or
        - systemctl status apache2
        - If the service is stopped, start it:
        - sudo systemctl start nginx
    - Web services usually run on port 80 (HTTP) or 443 (HTTPS).
        - netstat -tulnp | grep 80 or
        - ss -tulnp
        - This confirms whether the server is listening on the correct port.
    - Check Server IP and Connectivity
        - ping ip
- systemctl Command
    - manage system services in systems that use systemd.
- netstat Command
    - netstat is used to view network connections, listening ports, and routing tables.
    - 
- How to check parent and child process?
    - In Linux, every process has:
    - PID → Process ID
    - PPID → Parent Process ID
    - A parent process creates a child process.
- Best Command to See Parent-Child Tree
    - pstree
- How to check services and logs?
    - systemctl Command
    - check services using systemctl status service-name.
    - Logs can be checked using journalctl or by viewing files in /var/log/.
    - For real-time log monitoring, we use tail -f log-file.
