import os
import subprocess

for dirpath, _, filenames in os.walk("public/img"):
    for filename in filenames:
        if filename.endswith(".png"):
            path = os.path.join(dirpath, filename)

            subprocess.run(["magick", path, "-strip", path])
