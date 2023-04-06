# Optimize images in ./public/img/ folder and make all of them have max height of 500px
# Usage: ./optimize.sh

# Optimize images
for f in ./public/img/*; do
  convert $f -resize x500 $f
done
