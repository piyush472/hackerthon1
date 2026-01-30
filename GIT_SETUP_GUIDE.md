# 🚀 Git Setup & Push Guide

## Prerequisites

Git is not currently installed on your system. Follow these steps to set up and push your code.

---

## Step 1: Install Git

### Windows
1. Download from: https://git-scm.com/download/win
2. Run the installer
3. Follow the default installation wizard
4. Restart your computer or terminal

### macOS
```bash
brew install git
```

### Linux (Ubuntu/Debian)
```bash
sudo apt-get install git
```

---

## Step 2: Configure Git (One-time Setup)

After installing Git, open PowerShell and run:

```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Example:
```powershell
git config --global user.name "Dance Learner"
git config --global user.email "dance@example.com"
```

---

## Step 3: Create a Repository on GitHub

1. Go to: https://github.com/new
2. Sign in with your GitHub account (create one if needed)
3. **Repository name:** `indian-dance-learning` (or your preferred name)
4. **Description:** "Indian Classical Dance Learning Platform with MediaPipe"
5. **Visibility:** Public (or Private if preferred)
6. Click "Create repository"
7. Copy the repository URL (e.g., `https://github.com/YourUsername/indian-dance-learning.git`)

---

## Step 4: Initialize Git in Your Project

Open PowerShell and navigate to your project:

```powershell
cd "C:\Users\vaibh\OneDrive\Desktop\hackshastar"
```

Initialize Git:

```powershell
git init
```

---

## Step 5: Add All Files to Git

```powershell
git add .
```

---

## Step 6: Create Initial Commit

```powershell
git commit -m "Initial commit: Indian Classical Dance Learning Platform with MediaPipe pose detection"
```

---

## Step 7: Add Remote Repository

Replace `YOUR_USERNAME` and `REPO_NAME`:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

Example:
```powershell
git remote add origin https://github.com/yourname/indian-dance-learning.git
```

---

## Step 8: Push to GitHub

```powershell
git branch -M main
git push -u origin main
```

When prompted, enter your GitHub credentials or use a personal access token.

---

## Complete Commands (Copy & Paste)

After installing Git and creating a GitHub repository:

```powershell
# Navigate to project
cd "C:\Users\vaibh\OneDrive\Desktop\hackshastar"

# Initialize repository
git init

# Add all files
git add .

# Create commit
git commit -m "Initial commit: Indian Classical Dance Learning Platform with MediaPipe"

# Add remote (replace USERNAME and REPO_NAME)
git remote add origin https://github.com/USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Alternative: GitHub Desktop

If you prefer a GUI:

1. Download: https://desktop.github.com/
2. Install and open GitHub Desktop
3. Click "Create a New Repository"
4. Select your project folder
5. Enter repository name and description
6. Click "Create Repository"
7. Click "Publish repository"
8. Choose Public or Private
9. Click "Publish"

---

## Verify Your Repository

After pushing, verify everything is on GitHub:

```powershell
git log
git remote -v
```

---

## Future Commits

After initial push, use these commands for future updates:

```powershell
# Check status
git status

# Add changes
git add .

# Commit
git commit -m "Your commit message"

# Push
git push
```

---

## Files in Your Repository

Your push will include:

```
✅ index.html (redesigned UI)
✅ src/app.js (updated logic)
✅ src/utils/poseDetection.js (MediaPipe)
✅ src/utils/poseAnalytics.js (Analytics)
✅ src/data/danceData.js (Content)
✅ src/styles/style.css (Styling)
✅ README.md (Documentation)
✅ QUICKSTART.md (Quick guide)
✅ SETUP.md (Setup guide)
✅ .gitignore (Git rules)
✅ package.json (Dependencies)
✅ All documentation files
```

---

## Troubleshooting

### "fatal: not a git repository"
```powershell
git init
```

### "Permission denied" when pushing
- Check your GitHub credentials
- Use personal access token instead of password
- Go to: https://github.com/settings/tokens

### "branch -M: fatal: invalid branch name"
```powershell
git branch -m main
git push -u origin main
```

### "failed to push some refs"
```powershell
git pull --rebase origin main
git push origin main
```

---

## Git Ignore File Already Configured

Your `.gitignore` file already excludes:
- `node_modules/`
- `.env` files
- IDE files (.vscode, .idea)
- Build artifacts
- OS files (Thumbs.db, .DS_Store)

---

## Next Steps

1. ✅ Install Git
2. ✅ Configure Git user
3. ✅ Create GitHub repository
4. ✅ Follow Step 4-8 above
5. ✅ Share your repo URL!

---

## Resources

- Git Documentation: https://git-scm.com/doc
- GitHub Guides: https://guides.github.com/
- GitHub Desktop: https://desktop.github.com/
- Markdown Guide: https://www.markdownguide.org/

---

**Once Git is installed, you can push your code and share it with the world!** 🚀

Let me know when you've installed Git and I can help you push the code!
