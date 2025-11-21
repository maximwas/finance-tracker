from pathlib import Path

def ensure_jsx_import(lines):
    target = "import { type JSX } from 'react';"
    if any(target == line.strip() or target == line for line in lines):
        return lines, False
    for idx, line in enumerate(lines):
        stripped = line.strip()
        if stripped.startswith('import') and 'from' in stripped and ("from 'react'" in stripped or 'from "react"' in stripped):
            lines.insert(idx + 1, target)
            return lines, True
    insert_idx = 0
    while insert_idx < len(lines) and lines[insert_idx].strip().startswith(("'use ", '"use ', "'use", '"use"')):
        insert_idx += 1
    if insert_idx < len(lines) and lines[insert_idx].strip() == '':
        insert_idx += 1
    for idx in range(insert_idx, len(lines)):
        if lines[idx].startswith('import '):
            lines.insert(idx, target)
            return lines, True
    lines.insert(insert_idx, target)
    return lines, True

def main():
    root = Path('frontend/src')
    target = "JSX.Element"
    counter = 0
    for path in root.rglob('*.tsx'):
        text = path.read_text()
        if 'React.JSX.Element' not in text:
            continue
        new_text = text.replace('React.JSX.Element', 'JSX.Element')
        lines = new_text.split('\n')
        lines, inserted = ensure_jsx_import(lines)
        final_text = '\n'.join(lines)
        if final_text != text:
            path.write_text(final_text)
            counter += 1
    print(f'Updated {counter} files')

if __name__ == '__main__':
    main()
