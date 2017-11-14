import sys, os, re, shutil, errno, subprocess, filecmp

# Problems

# Store user cmdline args
cfg = {
  'src':      './?',
  'template': './?',
  'build':    './?',
}

# Examine an HTML file for instances of "{{filename}}"
# - if name of file equals instance found in file, RecursionError
# - if instance found in file not in template, AttributeError
# - if parsing a file in template, TypeError
# if {{filename}} is found and passes the error checking, pass the filename to replace

FATAL   = '[!]'
WARN    = '[#]'
NORMAL  = '[:]'
FOUND   = '[@]'

# Log to the console if verbose mode is on
def log(string, label=NORMAL):
  print(label + ' ' + string)

# Copy contents of one file to another
# and create the outfile if it doesn't exist
def copyfile(infile, outfile):
  # Check to see if the path to the outfile already exists
  if not os.path.exists(os.path.dirname(outfile)):

    # If it doesn't, try to make the file, then copy
    # the contents from infile to it
    try:
      os.makedirs(os.path.dirname(outfile))
      shutil.copy(infile, outfile)  
    except OSError as exc:
      if exc.errno != errno.EEXIST:
        raise
  
  # Otherwise if the path is not a file, copy to it
  elif not os.path.isfile(outfile):
    shutil.copy(infile, outfile)

# Parse an html file to find instances of {{}}
def parse(filelist):

  log('Parsing targets...')

  for path in filelist:

    with open(path, 'r') as file:

      for line in file:

        # Regex each match. This will simply match all instances between {{}}
        matches = re.findall(r'{{(.*?)}}', line, re.DOTALL)

        # If matches exist, replace them
        if matches:
          replace(path, cfg['build'] + path, matches)

        # If no matches, still copy the file to build
        else:
          copyfile(path, cfg['build'] + path)

# Take a path and examine all of it's contents recursively for HTML files
# Return a list of those paths
def analyzeDir(path):
  # If template doesn't exist, abort

  # If BUILD doesn't exist, make it

  # Recursively analyze the directory for HTML files
  filelist = []

  # Walk the source directory and analyze all files
  for root, subdirs, files in os.walk(path):

    # All other html files are valid for replacement
    for filename in files:
      file_path = os.path.join(root, filename)
      if filename.endswith('.html'):
        filelist.append(file_path)
      else:
        copyfile(file_path, cfg['build'] + file_path)

  # Make sure there are files that can be analyzed
  if filelist:
    log('Found targets: ' + ', '.join(filelist), FOUND)
  else:
    raise IOError('No targets found, abort.')

  return filelist

# Replace all instances of replace in infile with content of outfile
def replace(infile, outfile, replace):
            # os.makedirs(os.path.dirname(filename), exist_ok=True)
          # with open(filename, "w") as f:
          #     f.write("FOOBAR")

  log('Replacing instances of ' + ', '.join(replace) + ' in ' + infile)

  # Copy infile to outfile and create outfile if it doesn't exist
  copyfile(infile, outfile)

  # For each match given,
  for match in replace:

    # Check to see if it matches the name of a template
    for root, subdirs, files in os.walk(cfg['template']):
      for name in files:
        if name.endswith((".html")) and match in name:

          # If it does, get the path to the template
          template_path = os.path.join(root, name)

          # Move content from the template file to a variable
          with open(template_path) as file:
            template_content = str(file.read())

          # Re-build the matched regex
          m = ''.join(['{', '{', match, '}', '}'])

          # Open the outfile and replace all instances of
          # the match m with the content from the template file
          with open(outfile, 'r+') as file:
            web_content = str(file.read())
            web_content = web_content.replace(m, template_content)
            file.seek(0)
            file.truncate()
            file.write(web_content)

# Handle arguments
def cli():

  # Get source directory
  if sys.argv[1]:
    cfg['src'] =      sys.argv[1]
  else:
    raise IOError('No source directory selected')

  # Get templates directory
  if sys.argv[2]:
    cfg['template'] = sys.argv[2]
  else:
    raise IOError('No template directory selected')
  
  # Get build directory
  if sys.argv[3]:
    cfg['build'] =    sys.argv[3]
  else:
    raise IOError('No build directory selected')

  # Error Handling

  log('Making sure directories aren\'t nested...')

  # Make sure no folders are nested in each other
  dirs = [cfg['src'], cfg['template'], cfg['build']]
  for outerdir in dirs:
    for innerdir in dirs:

      if outerdir != innerdir:
        if os.path.realpath(outerdir).startswith(os.path.realpath(innerdir)):
          raise OSError(outerdir + ' is inside ' + innerdir + '. Un-nest directories and try again.')

          # => ./     # => ./template      # => ./build      # => VERIFY = True

# swan.py <directory> <template_directory> <build_directory>
if __name__ == '__main__':

  # Take inputs from commandline
  cli()

  # Analyze the source directory, and and parse files
  parse(analyzeDir(cfg['src']))
