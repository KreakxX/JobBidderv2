from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import undetected_chromedriver as uc
import time
from selenium.webdriver.common.by import By


app = FastAPI()

cache = []

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from job import job
from Cached import Cached

class jobRequest(BaseModel):
   title: str
   ort: str

def automaticallyApplyToJob():
   email = "jan.zinke@wvog.berlin"
   password = "1234"
   driver = uc.Chrome(use_subprocess=False)
   driver.get(url="https://www.indeed.com/viewjob?jk=608d2fe500a388c6&from=serp&vjs=3&__cf_chl_tk=wJ7s.zByhb0gOSnTua6nImKaIuVAdYVs2KnBmivbUyk-1743181620-1.0.1.1-Tm_vIvJVPQicxipFfwvs4rkBgQcpKqbru5Cr9BmYyso")
   time.sleep(10)
   apply_button = driver.find_element(By.CSS_SELECTOR, "button[aria-label='Apply now ']")
   apply_button.click()

   time.sleep(10)
   driver.quit()
      

def scrappeFromIndeed(title: str, ort: str):
    jobs = []
    driver = uc.Chrome(use_subprocess=False)
    driver.get(f"https://www.indeed.com/jobs?q={title}&l={ort}&from=searchOnDesktopSerp&cf-turnstile-response=0.uZjJoV5yM4swLgPLGPd53mE5oiqVJ1cTZttoxMO_mqlJDVoMQJTrBy0Jwaw2vtZhi94Gk-zQfF9r5VfDBAnwO9DCrYOxnHq_wU85AnL9WY-MSDMryoxQXgxKT1jMnf_aEuLIsDX3q13ZmDU6pl2epzPCeF6s-6BUi5lQi4gnpVrj_SwmgNZgXf9KG6aFPU9lv61OJu9K59JaioqX18aOSahiVhjlTNDrA2-DY0zyxgsPPQbDcIpfwVz1H6AGfzFFgL4X9WghWBP90JkqHiOetdemM7qBl-z7mKJne58NGtFF834OS7lGVVHJcJhE2qCVZyGdCvDDwkVNLW4c7Zw262iJEKlPyh2rte6Vlu4fLDyqAO00X6yW6YKqmMTTWw9M_25ro-bp5tEKlenKJay53pmWsYp3TS0LH_T9nYZhsmJ4bnRF3-EwofGQHziJ0QUtBoBaZR-3BB3EMBfgkztAAw8ISMSCLo-rU1685i45xHozuEhQE9t5wZ8ciDejOyZ_yg7L641_wsunQ6hjJ_Mda7y6IP3uB5F2TvO0BO0fwZ_lSjJxmvps3eNigH8fUiTnZvJr2br-kUOXvwFZnlxadAWhJ0iQoBJYWU6w56jk_kLJdNTVEXXt4IjHt-hmEbiK9yLCnV2-OYq9MGyLw9uPrKx5BTuxVMylcW4MS3jnG7N3EJizCJVEpmBXfzn21qTGwWV4c2StVGQCQ5inq5Co2DpiXtww9ko-7ZiD1Nkk8Dzot6E1nlCYKYWKtJoTwZQ48rZQai1EsayRd8GlyUvS-Qwj_9VfvUqnfH1x7A9Qn3ldycpSKW8j8NG2U_M0jbwkFc63Ps3ILDDiwyexN_Ypww.FpMTOfJ"
    "_5GJrGOQhAx2v8A.d24cd58f703be308180c3fe29dff81a112acbef361f56718dbba5274612a51ec&vjk=c237711b18542f69")
    print(driver.current_url)
    time.sleep(10)  
    print(driver.title)
    elements = driver.find_elements(By.CSS_SELECTOR,".cardOutline.tapItem.dd-privacy-allow.result")
    for element in elements:
      Jobtitle = element.find_element(By.CSS_SELECTOR,"h2.jobTitle span").text
      company = element.find_element(By.CSS_SELECTOR,"span[data-testid='company-name']").text
      url = element.find_element(By.CSS_SELECTOR,"a[data-jk]").get_attribute("href")
      time.sleep(2)
      element.click()
      time.sleep(2)
      newElement = driver.find_element(By.CSS_SELECTOR, ".jobsearch-JobComponent.css-1kw92ky.eu4oa1w0")
      try:
        payment = newElement.find_element(By.CSS_SELECTOR, "li[data-testid='list-item']").text
        JobType = newElement.find_element(By.CSS_SELECTOR,"[data-testid='Full-time-tile']").text

        if "$" not in payment:
           payment = "Unknown"
      except Exception as e:
        print(f"An error occurred: {e}")
        payment = "Unknown" 
        JobType = "Unknown"

      description = newElement.find_element(By.CSS_SELECTOR,".jobsearch-JobComponent-description.css-wppltw.eu4oa1w0").text
      print(payment)
      print(description)
      x = job(Jobtitle, company, url, payment,JobType, description)
      jobs.append(x)
      y = Cached(jobs, title, ort)
      cache.append(y)
    time.sleep(20)  
    driver.quit()
    return jobs
 
 
@app.post("/ScrappeJobsFromIndeed")
def ScrappeJobsFromIndeed(request: jobRequest):
    for x in cache[:]:
       if (x.created + 1200) <  int(time.time()):
          cache.remove(x)
    for x in cache:
        print(x.title)
        print(x.ort)
        print(cache)
        if x.title == request.title and x.ort == request.ort:
            return x.arr
    return scrappeFromIndeed(request.title, request.ort)

@app.post("/automatically/apply/Job")
def automaticallyApplyOnJobs():
   automaticallyApplyToJob()

if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)