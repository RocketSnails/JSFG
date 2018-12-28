import sys
import time
import uuid

import xlsxwriter
import os

start_time = time.time()

# Iterate over the data and write it out row by row.
sheet_size = 5
need_size = int(sys.argv[1])

filename = str(uuid.uuid4()) + ".xlsx"


def generate_xlsx(m_count):
    global row, col, size
    wb = xlsxwriter.Workbook(filename)
    new_sheet = wb.add_worksheet('Sheet1')
    for row in range(0, m_count):  # write NEW data
        for col in range(sheet_size):
            new_sheet.insert_image(row, col, 'test.jpeg')
    wb.close()
    size = os.stat('Expenses01.xlsx').st_size
    return size


count = 50
size50 = generate_xlsx(count)
k50 = -(-size50 // 50)
count = int(need_size / k50) + 1

size = generate_xlsx(count)
if size < need_size:
    count = int(count - (-(need_size - size) // k50))
    size = generate_xlsx(count)

# print(str(size / 1024 / 1024) + " MBytes")
# print("--- %s seconds ---" % (time.time() - start_time))
print(filename)
