# Linux Interview Notes for Application Support Engineer

## 1. What is Linux and why is it used in servers?

Linux is an open-source operating system based on Unix.

### 2. Why Linux is used in servers
- Stable and reliable
- Secure
- Free and open source
- Popular distributions: Ubuntu, CentOS, RedHat

---

## 3. What is Linux Kernel?

The **kernel** is the core of the Linux operating system.
It acts as an interface between the computers hardware and the software running on it.

It manages:
- CPU
- Memory
- Hardware devices
- Processes

---

## 4. what is a shell in Linux?
A shell in Linux is an interface that allows you to interact with the OS by running commands.

## 5. what are some common shells in linux?
Common Linux shells include bash,Tcsh,Zsh and Ksh

## 6. How do you create a new user in linux?
using the useradd or adduser command.
```bash
sudo useradd username

# after creating the username
sudo passwd username

# Sometimes you create a user with a home directory:
sudo useradd -m username
# this creates /home/username
```

## 7. what is the root user in linux?
- The root user is the superuser or administrator account in Linux that has full control over the entire system.
- The root user can read, write, and execute any file and can modify system settings.
```bash
# When logged in as root, the command prompt usually ends with # instead of $.
root@server:~#

# normal user
sagar@server:~$
```
## 8. explain the file permission in linux
File permissions in Linux control who can read, write, or execute a file or directory. They are used to protect files and restrict access to authorized users.
- There are three types of permissions:
    - read r
    - write w
    - execute x
- Permissions are assigned to three groups of users:
    - User (Owner) - The person who owns the file
    - Group - Users in the same group
    - Others - All other users on the system
```bash
ls -l
# -l means long details format
# output - -rwxr-xr-- 1 sagar dev 1200 Mar 12 file.sh
# rwxr-xr-- --> rwx - user permission, r-x - group permission, r-- - other permission
```
## 9. How do you change file permission on Linux?
- Use chmod command.
```bash
chmod permissions filename

chmod 755 file.sh
# This changes the permission of file.sh.
# 7 (4+2+1)  rwx
# 5 (4+1)    r-x
# 5 (4+1)    r-x
```
- Each permission has a number value:
    - read (r) -> 4
    - write (w) -> 2
    - execute (x) -> 1

## 10. what is process in linux?
- a process is an running instance of a program in linux.
- each process has a unique identifier called a process ID(PID).
- For example:
    - When you run firefox → a Firefox process starts
    - When you run mysql → a MySQL process runs
## 11. how do you view active processes in linux
- using command like ps, top or htop
## 12. how do you kill a process in linux?
- kill command and the process id
```bash
kill pid
```
## 13. what is a daemon in linux?
- A daemon is a background process that runs continuesly and typically start at boot.
## 14. what is the diff btn soft link and hard link in Linux.
- a soft link is a pointer to a file
- while hard link is a direct mirror of the file
- deleting the original file affects a soft link but not a hard link
## 15. what is the use of df command in linux?
- display disk space usage of file system
## 16. what does the free command do in linux?
- display the total amount of free and used physical RAM and swap memory in the system
## 17. explain the purpose of the grep command.
- used to search for specific text or patterns inside files. It scans the file and displays the lines that match the given word or pattern
```bash
grep "pattern" filename

# example
grep "error" log.txt
# This command will search for the word "error" in the file log.txt and display all matching lines.

grep -i "error" log.txt
# -i ignores uppercase and lowercase differences.

grep -n "error" log.txt
# -n Displays the line number where the word appears.

grep "error" *.log
# Searches error in all .log files.
```
## 18. What is symbolic link in Linux?
- a symbolic link or symlink, is a file that points to another file or directory.
- It's a referece that can be used to access the target file.

## 19. what are inodes in Linux?
- an inodes is a data structure in filesystem that stores information about a file except its name or actual data.
- every file and directory associated with inode, which is identify by inode nnumber in file system. 
- This inode number is a unique identifier within the file system.
```bash
ls -i
# output
# 123456 file1.txt
# 123457 file2.txt

# 123456 → inode number of file1.txt
# 123457 → inode number of file2.txt
```
## 20. what is the purpose of crone tab in linux?
- in terms of automation and scheduling crone tabs plays a crucial role.
- cronetab is used to schedule commands to be executed periodically. 
```bash
# Open crontab file:
crontab -e

# View crontab jobs:
crontab -l

# Remove crontab jobs:
crontab -r

* * * * * command
│ │ │ │ │
│ │ │ │ └── Day of week (0-7)
│ │ │ └──── Month (1-12)
│ │ └────── Day of month (1-31)
│ └──────── Hour (0-23)
└────────── Minute (0-59)

# Run a script every day at 2 AM:
0 2 * * * /home/user/backup.sh

# Run a script every 5 minutes:
*/5 * * * * /home/user/script.sh
```
## 21. how can you find ip address of a linux server?
- ifconfig or ip addr command
## 22. explain the purpose of the sshd service?
- The sshd (Secure Shell Daemon) service allows users to securely connect to a remote Linux server over a network.
- Main Purpose of sshd
    - Provides secure remote login to a server
    - Encrypts communication between client and server
    - Allows remote command execution
    ```bash
    ssh user@192.168.1.10
    ```
## 23. how do you check the status of a service in Linux?
- You can check the status of a service in Linux using the systemctl command.
```bash
# Check Status of a Specific Service
systemctl status servicename

systemctl status sshd
# This command shows:
# Whether the service is running or stopped
# Process ID (PID)
# Logs
# Service start time
```
## 24. what is the purpose of the /etc/passwd file?
- The /etc/passwd file in Linux stores user account information for all users on the system.
## 25. how do you search file in linux?
- find or locate command
```bash
locate userfile
```
## 26. what is the purpose of ip tables?
- iptables is a Linux firewall tool used to control network traffic by allowing or blocking connections based on predefined rules. It helps secure the server by filtering incoming and outgoing packets.
- Main Purpose of iptables
- Secure the server
- Allow or block network connections
- Filter incoming and outgoing traffic
- Protect against unauthorized access
## 27. what are environment variables in Linux?
- Environment variables in Linux are variables that store configuration settings used by the system and applications. They help control system behavior and store information like the user's home directory or executable paths.
- using printenv command we can see our environment
## 28. how do you set an environment variable in linux?
- can be set using the export command
```bash
export MY_VAR="Hello"
```
## 29. what is the purpose of the /etc/shadow file?
- stored actual password data in an encrypted format
## 30. explain the use of ping command?
- to mejor the latency
- The ping command in Linux is used to check network connectivity between two devices.
- It sends ICMP (Internet Control Message Protocol) echo requests to a target host and waits for a reply.
- Check if a server or website is reachable
- Test network connectivity
- Measure network latency (response time)
- Troubleshoot network issues
## 31 diff btn wget and curl?
- both are command line tool for transferring data over the network.
- 