import os
import re

files = [
    "src/app/[lang]/blogs/ky-thi-fe/content-vi.tsx",
    "src/app/[lang]/blogs/ky-thi-fe/content-en.tsx",
    "src/app/[lang]/blogs/ky-thi-fe/content-ja.tsx"
]

replacements = [
    (r'bg-slate-50 dark:bg-\[\#0a0a0a\]', 'bg-background'),
    (r'bg-white dark:bg-\[\#121212\]', 'bg-card'),
    (r'text-slate-900 dark:text-white', 'text-foreground'),
    (r'text-slate-800 dark:text-slate-200', 'text-foreground/90'),
    (r'text-slate-700 dark:text-slate-300', 'text-foreground/80'),
    (r'text-slate-600 dark:text-slate-400', 'text-muted-foreground'),
    (r'text-slate-500 dark:text-slate-400', 'text-muted-foreground'),
    (r'border-slate-200 dark:border-slate-800', 'border-border/40'),
    (r'border-slate-100 dark:border-slate-800', 'border-border/40'),
    (r'border-slate-200 dark:border-slate-700', 'border-border/60'),
    (r'bg-slate-100 dark:bg-slate-800', 'bg-secondary/10'),
    (r'hover:bg-slate-100 dark:hover:bg-slate-800', 'hover:bg-secondary/20'),
    (r'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300', 'bg-primary/10 text-primary border border-primary/20'),
]

for file in files:
    if os.path.exists(file):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        for old, new in replacements:
            content = re.sub(old, new, content)
            
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file}")
    else:
        print(f"File not found: {file}")
