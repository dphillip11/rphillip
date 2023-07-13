import os

folder_path = 'Static/Gallery'  # Replace with the actual folder path
output_file = 'file_names.txt'  # Replace with the desired output file name

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
