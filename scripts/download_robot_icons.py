#!/usr/bin/env python3
"""
下载机器人系统专用图标
从Iconify API下载Material Design Icons
"""

import requests
import json
from pathlib import Path
import time

# 配置
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
MAPPING_FILE = SCRIPT_DIR / 'robot_icon_mapping.json'
OUTPUT_DIR = PROJECT_ROOT / 'public' / 'icons' / 'svg'
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
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.text
    except requests.RequestException as e:
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
        print(f"  ✅ 已保存: {filename}")
        return True
    except Exception as e:
        print(f"  ❌ 保存失败: {e}")
        return False

def main():
    """主函数"""
    print('=' * 80)
    print('🤖 下载机器人系统专用图标')
    print('=' * 80)
    print(f'\n📁 输出目录: {OUTPUT_DIR}\n')
    
    # 创建输出目录
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    # 加载图标映射
    mapping = load_icon_mapping()
    icons = mapping['icons']
    
    print(f'📊 共有 {len(icons)} 个机器人图标需要下载\n')
    
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
        
        # 避免请求过快
        time.sleep(0.1)
        print()
    
    # 输出统计
    print('=' * 80)
    print('✨ 下载完成!')
    print(f'✅ 成功: {success_count} 个')
    print(f'❌ 失败: {failed_count} 个')
    print('=' * 80)
    print(f'\n📂 SVG文件位置: {OUTPUT_DIR}')
    print('\n💡 使用示例:')
    print('  <SvgIcon name="robot-arm" :size="24" />')
    print('  <SvgIcon name="gripper" :size="20" />')
    print('  <SvgIcon name="emergency-stop" :size="32" class="danger" />')

if __name__ == '__main__':
    main()
