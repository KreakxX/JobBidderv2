import time

class Cached:
  def __init__(self, arr, title, ort):
    self.arr = arr
    self.title = title
    self.ort = ort
    self.created = int(time.time())
