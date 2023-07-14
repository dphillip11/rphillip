import os
import sys

# Get the directory path of the script
script_dir = os.path.dirname(os.path.abspath(sys.argv[0]))

# Define the folder and output file paths
folder_path = os.path.join(script_dir, 'gallery')
output_file = os.path.join(script_dir, 'file_names.txt')

# Get a list of file names in the folder
file_names = os.listdir(folder_path)

# Filter out non-file entries (e.g., subfolders)
file_names = [file for file in file_names if os.path.isfile(
    os.path.join(folder_path, file))]

# Enclose file names in quotation marks and join with commas
formatted_names = ', '.join([f'"{file_name}"' for file_name in file_names])

# Write the formatted names to the output file
with open(output_file, 'w') as file:
    file.write(formatted_names)

print(f'File list written to {output_file}.')
