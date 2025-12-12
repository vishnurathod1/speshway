import os
import re

def fix_assets_paths(root_dir):
    for dirpath, dirnames, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename.endswith('.html'):
                filepath = os.path.join(dirpath, filename)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                # Replace ../assets/ with /assets/ and assets/ with /assets/ if not already starting with /
                new_content = re.sub(r'\.\./assets/', '/assets/', content)
                new_content = re.sub(r'(?<!/)assets/', '/assets/', new_content)
                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated {filepath}")

if __name__ == "__main__":
    fix_assets_paths('.')
