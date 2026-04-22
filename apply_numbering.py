import os
import re
import yaml

with open("_quarto.yml", "r") as f:
    config = yaml.safe_load(f)

book_chapters = config.get("book", {}).get("chapters", [])

part_num = 0

for item in book_chapters:
    if isinstance(item, dict) and "part" in item:
        # Extract part number if it's already there
        m = re.match(r"^(\d+)\.\s+(.*)", item["part"])
        if m:
            part_num = int(m.group(1))
        else:
            part_num += 1
            
        chap_num = 0
        for chap_item in item.get("chapters", []):
            if isinstance(chap_item, str) and chap_item.startswith("chapters/"):
                chap_num += 1
                filepath = chap_item
                prefix = f"{part_num}.{chap_num}"
                
                with open(filepath, "r") as f:
                    fcontent = f.read()
                    
                # Fix the title in YAML (remove old prefix, add new)
                def title_repl(match):
                    title_text = match.group(2)
                    title_text = re.sub(r"^\d+(?:\.\d+)*\.\s+", "", title_text)
                    return f'{match.group(1)}{prefix}. {title_text}{match.group(3)}'
                    
                fcontent = re.sub(r"^(title:\s*[\"\']?)(.*?)([\"\']?)$", title_repl, fcontent, flags=re.MULTILINE)
                
                # Turn off Quarto's auto-numbering by adding unnumbered class to the title? No, we will just turn off number-sections globally.
                
                out_lines = []
                in_code = False
                in_yaml = False
                
                h2_counter = 0
                h3_counter = 0
                h4_counter = 0
                h5_counter = 0
                
                for line in fcontent.split("\n"):
                    if line.startswith("---"):
                        in_yaml = not in_yaml
                        out_lines.append(line)
                        continue
                        
                    if line.startswith("```"):
                        in_code = not in_code
                        out_lines.append(line)
                        continue
                        
                    if not in_yaml and not in_code:
                        m_h = re.match(r"^(#+)\s+(.*)", line)
                        if m_h:
                            level = len(m_h.group(1))
                            text = m_h.group(2)
                            
                            # Strip any existing hardcoded numbering
                            text = re.sub(r"^\d+(?:\.\d+)+\.\s+", "", text)
                            
                            if level == 2:
                                h2_counter += 1
                                h3_counter = 0
                                h4_counter = 0
                                h5_counter = 0
                                out_lines.append(f"## {prefix}.{h2_counter}. {text}")
                            elif level == 3:
                                h3_counter += 1
                                h4_counter = 0
                                h5_counter = 0
                                out_lines.append(f"### {prefix}.{h2_counter}.{h3_counter}. {text}")
                            elif level == 4:
                                h4_counter += 1
                                h5_counter = 0
                                out_lines.append(f"#### {prefix}.{h2_counter}.{h3_counter}.{h4_counter}. {text}")
                            elif level == 5:
                                h5_counter += 1
                                out_lines.append(f"##### {prefix}.{h2_counter}.{h3_counter}.{h4_counter}.{h5_counter}. {text}")
                            else:
                                out_lines.append(line)
                        else:
                            out_lines.append(line)
                    else:
                        out_lines.append(line)
                        
                with open(filepath, "w") as f:
                    f.write("\n".join(out_lines))
                    
# Now turn OFF number-sections in _quarto.yml
with open("_quarto.yml", "r") as f:
    qcontent = f.read()

qcontent = re.sub(r"\s*number-sections:\s*true\n", "\n", qcontent)

with open("_quarto.yml", "w") as f:
    f.write(qcontent)

