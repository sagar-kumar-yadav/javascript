```bash
bash --version
```
```bash
ls
# list of a directory

ls -l
# output - drwxr-xr-x  2 terminal  staff   64 Mar 15 11:34 project
# long listing format

ls -a
# include hidden files

ls -h
# human readable

ls -t
# file has been sort by modification time

ls -r
# reverse order while sorting

ls -s
# sort by file size

ls -1
# List one file per line

ls -d
# only show directory not their contents

ls -d */
# images/  myfolder/

ls -F
# Append indicator (one of */=@|) to entries
```
```bash
cd .. 
# Move up one directory level

cd ~
# hange to the home directory

cd -
#  Switch to the previous directory

cd /
# Change to the root directory
```
```bash
pwd
# print working directory

pwd -L
# print logical path, print symbolic link
# A symbolic link is like a shortcut that points to another file or directory.

pwd -P
# print physical path, actual disk path

ln -s file.txt mylink
# create syymbolic link
# ln -s creates symbolic (soft) links

ls -l
# if lrwxr-xr-x start with l then it's symbolic link
# if drwxr-xr-x start with d then it's disk file
```
```bash
echo "hello world"
# display text, variables, or messages on the terminal.
# commonly used in scripts, logging, and debugging.
```
```bash
cat file.txt
# display the content of file

cat > file.txt
# now type text
Hello Linux
Learning commands
# press
ctrl + D
# save

cat >> file.txt
# adds content to the end of the file instead of overwriting.

cat file1.txt file2.txt
# display multiple files

cat file1.txt file2.txt > file3.txt
# combine files

cat -n file.txt
# show line numbers

cat file.txt | grep "shells"
# cat command is often used with piping to send the content of files to other commands
```
```bash
# used to copy files and directories from one location to another

cp -r project p1
# project is a folder, coppied in p1

cp file1.txt file2.txt
# This creates a copy of file1.txt named file2.txt.

cp file1.txt /home/user/Documents/
# This copies file1.txt into the Documents folder.

cp file1.txt file2.txt file3.txt /home/user/backup/
# All files will be copied to the backup directory.

cp -i file1.txt file2.txt
# If file2.txt exists, Linux will ask:
overwrite file2.txt? (y/n)
```
## System Monitoring
```bash
ps # process status
 PID TTY          TIME CMD
1234 pts/0    00:00:01 bash
5678 pts/1    00:00:02 python
9101 pts/2    00:00:03 node

# | Column | Meaning       |
# | ------ | ------------- |
# | PID    | Process ID    |
# | TTY    | Terminal used |
# | TIME   | CPU time used |
# | CMD    | Command name  |

ps -e
or 
ps -A
# show all process

ps -f
# show detail information
UID        PID  PPID  C STIME TTY          TIME CMD
user      1234     1  0 08:00 pts/0    00:00:01 bash
user      5678  1234  0 08:01 pts/1    00:00:02 python
user      9101  5678  0 08:02 pts/2    00:00:03 node

ps aux
# output
USER   PID %CPU %MEM COMMAND
root     1  0.0  0.1 /sbin/init
sagar  2345 0.2  1.3 node server.js

# a → shows processes of all users
# u → displays processes in user format
# x → shows processes without a terminal
```
```bash
top # monitor system processes in real time
```
```bash
df # used to report file system disk space usage.
# useful tool for checking available storage on your system.
Filesystem     1K-blocks    Used Available Use% Mounted on
/dev/sda1       20480000 1024000  19456000   5% /
tmpfs            4096000       0   4096000   0% /dev/shm
/dev/sdb1       10240000  512000   9728000   5% /mnt/data

df -i
# Inodes: Inodes are data structures used by many file systems to store information about files and directories, such as their size, owner, permissions, and timestamps.
```
```bash
du 
```