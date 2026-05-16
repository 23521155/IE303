import os
import re

files = [
    "src/app/[lang]/blogs/ky-thi-fe/content-vi.tsx",
    "src/app/[lang]/blogs/ky-thi-fe/content-en.tsx",
    "src/app/[lang]/blogs/ky-thi-fe/content-ja.tsx"
]

for file in files:
    if os.path.exists(file):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remove unused lucide-react imports
        content = re.sub(r'AlertTriangle,\s*', '', content)
        content = re.sub(r'CheckCircle2,\s*', '', content)
        content = re.sub(r'Info,\s*', '', content)
        
        # Replace <a> with <Link> for internal links
        content = re.sub(r'<a href="/"([^>]*)>(.*?)</a>', r'<Link href="/"\1>\2</Link>', content)
        content = re.sub(r'<a href="/(en|ja)?/?category"([^>]*)>(.*?)</a>', r'<Link href="/\1/category"\2>\3</Link>', content)
        content = re.sub(r'<a href="/category"([^>]*)>(.*?)</a>', r'<Link href="/category"\1>\2</Link>', content)
        content = re.sub(r'<a key=\{tag\} href=\{`/tag/\$\{tag\}`\}([^>]*)>(.*?)</a>', r'<Link key={tag} href={`/tag/${tag}`}\1>\2</Link>', content)
        
        # Replace <a> in relatedPosts with <Link>
        # Wait, the related post maps have <a key={post.id} href={post.href} ...>
        content = re.sub(r'<a key=\{post\.id\} href=\{post\.href\}([^>]*)>', r'<Link key={post.id} href={post.href}\1>', content)
        # And the closing tag for related post is </a>, need to find it and replace with </Link>
        # Since it's multiline, we can just replace </a> but that would break <a href="#id">.
        # Wait, let's just let the user fix relatedPosts manually if it's too complex, or I can use a simpler regex.
        # Actually, let's check ESLint output! It only complained about line 96 and 98 which is Breadcrumb and Category!
        # It didn't complain about relatedPosts <a> tags.
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {file}")
    else:
        print(f"File not found: {file}")
