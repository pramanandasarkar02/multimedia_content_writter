import xml.etree.ElementTree as ET
import re


def xml_to_html(xml_string):
    root = ET.fromstring(xml_string)

    modals = []
    modal_counter = 0

    def next_modal_id():
        nonlocal modal_counter
        modal_counter += 1
        return f"modal-item-{modal_counter}"

    def youtube_embed_url(url):
        if "watch?v=" in url:
            return url.replace("watch?v=", "embed/")
        elif "youtu.be/" in url:
            return url.replace("youtu.be/", "www.youtube.com/embed/")
        return url

    def create_modal(modal_id, content):
        modals.append(f"""
<div class="modal-overlay" id="modal-{modal_id}">
  <div class="modal-box">
    <button class="modal-close" onclick="closeModal('modal-{modal_id}')">&times;</button>
    <div class="modal-content">
      {content}
    </div>
  </div>
</div>
""")

    def parse_inline_content(element):
        html = ""

        if element.text:
            html += element.text.strip()

        for child in element:
            if child.tag == "bold":
                html += f"<strong>{child.text.strip()}</strong>"

            elif child.tag == "italic":
                html += f"<em>{child.text.strip()}</em>"

            elif child.tag == "link":
                url = child.attrib.get("url", "#")
                text = child.text.strip()

                modal_id = next_modal_id()
                create_modal(
                    modal_id,
                    f"""
                    <p style="margin-bottom:12px;"><strong>{text}</strong></p>
                    <a href="{url}" target="_blank" style="color:#3b2fc9;">{url}</a>
                    """
                )

                html += f"""
                <span class="iterm" onclick="openModal('{modal_id}')">
                    {text}
                    <span class="term-icon">🔍</span>
                </span>
                """

            if child.tail:
                html += child.tail

        return html

    article_title = root.findtext("title", "Untitled Article")

    article_sections = ""
    sidebar_sections = ""

    for section_index, section in enumerate(root.findall("section"), start=1):
        section_id = section.attrib.get("id", str(section_index))
        section_title = f"Section {section_id}"

        section_body = ""

        for child in section:
            if child.tag == "paragraph":
                section_body += f"<p>{parse_inline_content(child)}</p>"

            elif child.tag == "explanation":
                modal_id = next_modal_id()

                create_modal(
                    modal_id,
                    f"<p>{child.text.strip()}</p>"
                )

                section_body += f"""
                <p>
                    <span class="iterm" onclick="openModal('{modal_id}')">
                        Explanation
                        <span class="term-icon">🔍</span>
                    </span>
                </p>
                """

            elif child.tag == "image":
                url = child.findtext("url", "")
                caption = child.findtext("caption", "")
                alt = child.findtext("alt", "")

                modal_id = next_modal_id()

                create_modal(
                    modal_id,
                    f"""
                    <img src="{url}" alt="{alt}" onerror="this.style.display='none'">
                    <p><strong>{caption}</strong></p>
                    <p>{alt}</p>
                    """
                )

                section_body += f"""
                <p>
                    <span class="iterm iterm-img" onclick="openModal('{modal_id}')">
                        <span class="icon">🖼</span>
                        {caption}
                        <span class="term-icon">🔍</span>
                    </span>
                </p>
                """

            elif child.tag == "video":
                url = child.findtext("url", "")
                caption = child.findtext("caption", "")

                modal_id = next_modal_id()

                create_modal(
                    modal_id,
                    f"""
                    <video controls>
                        <source src="{url}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <p>{caption}</p>
                    """
                )

                section_body += f"""
                <p>
                    <span class="iterm iterm-video" onclick="openModal('{modal_id}')">
                        <span class="icon">📹</span>
                        {caption}
                        <span class="term-icon">🔍</span>
                    </span>
                </p>
                """

            elif child.tag == "audio":
                url = child.findtext("url", "")
                caption = child.findtext("caption", "")

                modal_id = next_modal_id()

                create_modal(
                    modal_id,
                    f"""
                    <audio controls style="width:100%">
                        <source src="{url}" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                    <p>{caption}</p>
                    """
                )

                section_body += f"""
                <p>
                    <span class="iterm iterm-audio" onclick="openModal('{modal_id}')">
                        <span class="icon">🔊</span>
                        {caption}
                        <span class="term-icon">🔍</span>
                    </span>
                </p>
                """

            elif child.tag == "youtube":
                url = child.findtext("url", "")
                title = child.findtext("title", "")

                embed_url = youtube_embed_url(url)

                modal_id = next_modal_id()

                create_modal(
                    modal_id,
                    f"""
                    <iframe src="{embed_url}" allowfullscreen></iframe>
                    <p>{title}</p>
                    """
                )

                section_body += f"""
                <p>
                    <span class="iterm iterm-yt" onclick="openModal('{modal_id}')">
                        <span class="icon">▶</span>
                        {title}
                        <span class="term-icon">🔍</span>
                    </span>
                </p>
                """

            elif child.tag == "website":
                url = child.findtext("url", "")
                title = child.findtext("title", "")

                modal_id = next_modal_id()

                create_modal(
                    modal_id,
                    f"""
                    <p style="margin-bottom:12px;"><strong>{title}</strong></p>
                    <a href="{url}" target="_blank" style="color:#3b2fc9;">{url}</a>
                    """
                )

                section_body += f"""
                <p>
                    <span class="iterm" onclick="openModal('{modal_id}')">
                        {title}
                        <span class="term-icon">🔍</span>
                    </span>
                </p>
                """

        article_sections += f"""
        <div class="card">
          <div class="article-title">{section_title}</div>
          <div class="article-body">
            {section_body}
          </div>
        </div>
        """

        sidebar_sections += f"""
        <div class="accordion-item" id="acc{section_id}">
          <div class="accordion-header" onclick="toggleAccordion('acc{section_id}')">
            {section_title}
            <span class="accordion-arrow">&#8964;</span>
          </div>
          <div class="accordion-body">
            This section contains interactive multimedia content related to {section_title.lower()}.
          </div>
        </div>
        """

    full_html = f"""
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{article_title}</title>

<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}

  body {{
    font-family: 'Segoe UI', Arial, sans-serif;
    background: #f5f5f5;
    color: #222;
    line-height: 1.7;
  }}

  .header {{
    background: linear-gradient(135deg, #3b2fc9 0%, #6b5aed 60%, #8b7cf8 100%);
    color: #fff;
    text-align: center;
    padding: 48px 24px 40px;
  }}

  .header h1 {{
    font-size: 2.4rem;
    margin-bottom: 10px;
  }}

  .main-layout {{
    display: grid;
    grid-template-columns: 1fr 280px;
    gap: 32px;
    max-width: 1100px;
    margin: 36px auto;
    padding: 0 24px;
  }}

  @media (max-width: 780px) {{
    .main-layout {{
      grid-template-columns: 1fr;
    }}
  }}

  .card {{
    background: #fff;
    border-radius: 10px;
    border: 1px solid #e0dff8;
    padding: 28px;
    margin-bottom: 28px;
  }}

  .article-title {{
    font-size: 1.2rem;
    font-weight: 700;
    color: #3b2fc9;
    margin-bottom: 18px;
    border-bottom: 2px solid #e0dff8;
    padding-bottom: 10px;
  }}

  .article-body p {{
    margin-bottom: 14px;
  }}

  .iterm {{
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #d0190a;
    font-weight: 700;
    cursor: pointer;
  }}

  .iterm-img {{ color: #c0390a; }}
  .iterm-audio {{ color: #1a5fbf; }}
  .iterm-video {{ color: #c0390a; }}
  .iterm-yt {{ color: #c0390a; }}

  .term-icon {{
    font-size: 0.75rem;
    background: currentColor;
    color: #fff;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }}

  .accordion-item {{
    background: #3b2fc9;
    border-radius: 8px;
    margin-bottom: 10px;
    overflow: hidden;
  }}

  .accordion-header {{
    display: flex;
    justify-content: space-between;
    padding: 15px 20px;
    cursor: pointer;
    color: #fff;
  }}

  .accordion-body {{
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
    background: #fff;
    padding: 0 18px;
  }}

  .accordion-item.open .accordion-body {{
    max-height: 200px;
    padding: 14px 18px;
  }}

  .modal-overlay {{
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(40,30,120,0.35);
    z-index: 1000;
    align-items: center;
    justify-content: center;
  }}

  .modal-overlay.active {{
    display: flex;
  }}

  .modal-box {{
    background: #fff;
    border-radius: 14px;
    max-width: 560px;
    width: 92%;
    padding: 36px 32px 28px;
    position: relative;
  }}

  .modal-close {{
    position: absolute;
    top: 14px;
    right: 18px;
    font-size: 1.4rem;
    cursor: pointer;
    border: none;
    background: none;
  }}

  .modal-content img,
  .modal-content video,
  .modal-content iframe {{
    width: 100%;
    border-radius: 8px;
    margin-bottom: 10px;
  }}

  .modal-content audio {{
    width: 100%;
    margin-bottom: 10px;
  }}

  footer {{
    text-align: center;
    padding: 24px;
    color: #888;
    font-size: 0.85rem;
    border-top: 1px solid #e0dff8;
    margin-top: 20px;
  }}
</style>
</head>
<body>

<header class="header">
  <h1>{article_title}</h1>
  <p>Click on highlighted terms to explore multimedia content</p>
</header>

<div class="main-layout">

  <div>
    {article_sections}
  </div>

  <div class="sidebar">
    <div class="card">
      <div class="article-title">Sections</div>
      {sidebar_sections}
    </div>
  </div>

</div>

<footer>Interactive Teaching Platform © 2026</footer>

{''.join(modals)}

<script>
  function openModal(id) {{
    document.getElementById('modal-' + id).classList.add('active');
    document.body.style.overflow = 'hidden';
  }}

  function closeModal(id) {{
    document.getElementById(id).classList.remove('active');
    document.body.style.overflow = '';
  }}

  document.querySelectorAll('.modal-overlay').forEach(function(overlay) {{
    overlay.addEventListener('click', function(e) {{
      if (e.target === overlay) {{
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }}
    }});
  }});

  document.addEventListener('keydown', function(e) {{
    if (e.key === 'Escape') {{
      document.querySelectorAll('.modal-overlay.active').forEach(function(m) {{
        m.classList.remove('active');
        document.body.style.overflow = '';
      }});
    }}
  }});

  function toggleAccordion(id) {{
    var item = document.getElementById(id);
    var isOpen = item.classList.contains('open');

    document.querySelectorAll('.accordion-item').forEach(function(el) {{
      el.classList.remove('open');
    }});

    if (!isOpen) {{
      item.classList.add('open');
    }}
  }}
</script>

</body>
</html>
"""

    return full_html


with open("demo.xml", "r", encoding="utf-8") as file:
    xml_data = file.read()

html_output = xml_to_html(xml_data)

with open("index.html", "w", encoding="utf-8") as file:
    file.write(html_output)

print("index.html generated successfully")