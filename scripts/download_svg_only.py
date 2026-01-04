"""
下载纯SVG图标文件
不进行任何转换，保存原始SVG格式
"""

import requests
import json
from pathlib import Path
import urllib3

# 禁用SSL警告
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# 配置
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
MAPPING_FILE = SCRIPT_DIR / 'icon_mapping.json'
OUTPUT_DIR = PROJECT_ROOT / 'public' / 'icons' / 'svg'  # 保存到public目录
ICONIFY_API = 'https://api.iconify.design'

def load_icon_mapping():
    """加载图标映射配置"""
    with open(MAPPING_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def fetch_icon_svg(icon_id: str) -> str:
    """从 Iconify API 获取原始 SVG"""
    url = f"{ICONIFY_API}/{icon_id}.svg"
    print(f"  📥 下载: {url}")
    
    try:
        response = requests.get(url, timeout=10, verify=False)
        response.raise_for_status()
        return response.text
    except requests.RequestException as e:
        print(f"  ⚠️ API失败，尝试备用方案...")
        try:
            backup_url = f"https://icon-sets.iconify.design/{icon_id.replace(':', '/')}.svg"
            response = requests.get(backup_url, timeout=10, verify=False)
            response.raise_for_status()
            return response.text
        except:
            print(f"  ❌ 下载失败: {e}")
            return None

def save_svg_file(name: str, svg_content: str) -> bool:
    """保存SVG文件"""
    if not svg_content:
        return False
    
    # 转换为小写+连字符命名
    filename = name.lower().replace('_', '-') + '.svg'
    file_path = OUTPUT_DIR / filename
    
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(svg_content)
        print(f"  ✅ 已保存: {file_path}")
        return True
    except Exception as e:
        print(f"  ❌ 保存失败: {e}")
        return False

def create_index_html():
    """创建SVG图标预览页面"""
    mapping = load_icon_mapping()
    icons = mapping['icons']
    
    html_content = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SVG图标库 - {len(icons)}个图标</title>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: #e2e8f0;
            padding: 40px;
            min-height: 100vh;
        }}
        
        h1 {{
            text-align: center;
            color: #f59e0b;
            margin-bottom: 10px;
            font-size: 36px;
        }}
        
        .subtitle {{
            text-align: center;
            color: #94a3b8;
            margin-bottom: 40px;
            font-size: 18px;
        }}
        
        .search-bar {{
            max-width: 600px;
            margin: 0 auto 40px;
            position: relative;
        }}
        
        .search-bar input {{
            width: 100%;
            padding: 16px 20px;
            font-size: 16px;
            background: rgba(30, 41, 59, 0.6);
            border: 1px solid rgba(148, 163, 184, 0.2);
            border-radius: 12px;
            color: #e2e8f0;
            outline: none;
            transition: all 0.3s;
        }}
        
        .search-bar input:focus {{
            border-color: #f59e0b;
            box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
        }}
        
        .icon-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 20px;
            max-width: 1400px;
            margin: 0 auto;
        }}
        
        .icon-item {{
            background: rgba(30, 41, 59, 0.6);
            border: 1px solid rgba(148, 163, 184, 0.1);
            border-radius: 12px;
            padding: 24px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }}
        
        .icon-item:hover {{
            transform: translateY(-4px);
            background: rgba(30, 41, 59, 0.8);
            border-color: #f59e0b;
            box-shadow: 0 8px 24px rgba(245, 158, 11, 0.2);
        }}
        
        .icon-item img {{
            width: 48px;
            height: 48px;
            filter: brightness(0) saturate(100%) invert(68%) sepia(67%) saturate(457%) hue-rotate(359deg) brightness(101%) contrast(93%);
            margin-bottom: 12px;
        }}
        
        .icon-item:hover img {{
            filter: brightness(0) saturate(100%) invert(68%) sepia(67%) saturate(457%) hue-rotate(359deg) brightness(120%) contrast(93%);
        }}
        
        .icon-name {{
            font-size: 13px;
            color: #cbd5e1;
            font-weight: 500;
            margin-bottom: 4px;
        }}
        
        .icon-filename {{
            font-size: 11px;
            color: #64748b;
            font-family: 'Courier New', monospace;
        }}
        
        .toast {{
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s;
            pointer-events: none;
        }}
        
        .toast.show {{
            opacity: 1;
            transform: translateY(0);
        }}
        
        .stats {{
            text-align: center;
            color: #94a3b8;
            margin-top: 40px;
            font-size: 14px;
        }}
    </style>
</head>
<body>
    <h1>🎨 SVG图标库</h1>
    <div class="subtitle">Material Design Icons - {len(icons)}个纯SVG图标</div>
    
    <div class="search-bar">
        <input type="text" id="searchInput" placeholder="搜索图标...">
    </div>
    
    <div class="icon-grid" id="iconGrid">
"""
    
    for icon_name, icon_id in icons.items():
        filename = icon_name.lower().replace('_', '-') + '.svg'
        html_content += f"""        <div class="icon-item" data-name="{icon_name.lower()}" onclick="copyPath('{filename}')">
            <img src="{filename}" alt="{icon_name}">
            <div class="icon-name">{icon_name}</div>
            <div class="icon-filename">{filename}</div>
        </div>
"""
    
    html_content += f"""    </div>
    
    <div class="stats">
        共 {len(icons)} 个图标 | 点击图标复制文件路径
    </div>
    
    <div class="toast" id="toast">已复制到剪贴板</div>
    
    <script>
        // 搜索功能
        document.getElementById('searchInput').addEventListener('input', function(e) {{
            const searchTerm = e.target.value.toLowerCase();
            const items = document.querySelectorAll('.icon-item');
            
            items.forEach(item => {{
                const name = item.getAttribute('data-name');
                if (name.includes(searchTerm)) {{
                    item.style.display = 'block';
                }} else {{
                    item.style.display = 'none';
                }}
            }});
        }});
        
        // 复制路径功能
        function copyPath(filename) {{
            const path = '/icons/svg/' + filename;
            navigator.clipboard.writeText(path).then(() => {{
                showToast('已复制: ' + path);
            }});
        }}
        
        function showToast(message) {{
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(() => {{
                toast.classList.remove('show');
            }}, 2000);
        }}
    </script>
</body>
</html>
"""
    
    index_file = OUTPUT_DIR / 'index.html'
    with open(index_file, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"\n📄 预览页面: {index_file}")
    return index_file

def main():
    """主函数"""
    print('🚀 开始下载SVG图标...')
    print(f'📁 输出目录: {OUTPUT_DIR}\n')
    
    # 创建输出目录
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    # 加载图标映射
    mapping = load_icon_mapping()
    icons = mapping['icons']
    
    print(f'📊 共有 {len(icons)} 个图标需要下载\n')
    
    # 下载图标
    success_count = 0
    failed_count = 0
    
    for icon_name, icon_id in icons.items():
        print(f'处理: {icon_name} -> {icon_id}')
        
        svg_content = fetch_icon_svg(icon_id)
        if save_svg_file(icon_name, svg_content):
            success_count += 1
        else:
            failed_count += 1
        print()
    
    # 创建预览页面
    create_index_html()
    
    # 输出统计
    print('='*60)
    print('✨ 下载完成!')
    print(f'✅ 成功: {success_count} 个')
    print(f'❌ 失败: {failed_count} 个')
    print('='*60)
    print(f'\n📂 SVG文件位置: {OUTPUT_DIR}')
    print(f'🌐 预览页面: {OUTPUT_DIR / "index.html"}')
    print('\n💡 提示: 在浏览器中打开 index.html 可以预览所有图标')

if __name__ == '__main__':
    main()
