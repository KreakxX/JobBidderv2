from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import undetected_chromedriver as uc
import time
from selenium.webdriver.common.by import By
from job import job
from typing import List
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
from docx import Document



app = FastAPI()

cache = []

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from Cached import Cached

class jobRequest(BaseModel):
   title: str
   ort: str


class Job(BaseModel):
   title: str
   company: str
   url: str
   payment: str
   JobType: str
   description: str

class ResumeRequest(BaseModel):
    vorname: str
    nachname: str
    Birtday: str
    BirthPlace: str
    Nationality: str
    marital: str
    educationDate1: str
    educationDate2: str
    educationDate3: str
    trainingDate1: str
    trainingDate2: str
    trainingDate3: str
    education1: str
    education2: str
    education3: str
    training1: str
    training2: str
    training3: str
    language1: str
    language2: str
    language3: str
    programming1: str
    programming2: str
    programming3: str
    programming4: str
    programming5: str
    programming6: str
    programming7: str
    programming8: str
    programming9: str
    datum: str
    ort: str





def generatePerfectResume(request: ResumeRequest):
    template_path = 'backend/templates/LebensLaufVorlage.docx'
    document = Document(template_path)
    
    placeholders = {
        '[[Vorname]]': request.vorname,
        '[[Nachname]]': request.nachname,
        '[[BirthDate]]': request.Birtday,
        '[[Birthplace]]': request.BirthPlace,
        '[[Nationality]]': request.Nationality,
        '[[Marital Status]]': request.marital,
        '[[Date 1]]': request.educationDate1,
        '[[Date 2]]': request.educationDate2,
        '[[Date 3]]': request.educationDate3,
        '[[Date 4]]': request.trainingDate1,
        '[[Date 5]]': request.trainingDate2,
        '[[ Date 6]]': request.trainingDate3,
        '[[Education 1]]': request.education1,
        '[[Education 2]]': request.education2,
        '[[Education 3]]': request.education3,
        '[[Training 1]]': request.training1,
        '[[Training 2]]': request.training2,
        '[[Training 3]]': request.training3,
        '[[Language 1]]': request.language1,
        '[[Language 2]]': request.language2,
        '[[Language 3]]': request.language3,
        '[[Programming 1]]': request.programming1,
        '[[Programming 2]]': request.programming2,
        '[[Programming 3]]': request.programming3,
        '[[Programming 4]]': request.programming4,
        '[[Programming 5]]': request.programming5,
        '[[Programming 6]]': request.programming6,
        '[[Programming 7]]': request.programming7,
        '[[Programming 8]]': request.programming8,
        '[[Programming 9]]': request.programming9,
        '[[Datum]]': request.datum,
        '[[Ort]]': request.ort,
    }


    for p in document.paragraphs:
        for placeholder, value in placeholders.items():
            if placeholder in p.text:
             if(value == "None"):
                 p.text = p.text.replace(placeholder, "")
             else:
                p.text = p.text.replace(placeholder, value)

        
    
    document.save(f"GenerateLebenslauf_{request.vorname}.docx")


def downloadAllJobLinks(jobs: List[Job]):
    urls = []
    for job in jobs:
       url = job.url
       urls.append(url)
   
    with open('job_links.txt', 'w') as file:
         for url in urls:
               file.write(url + '\n')


def scrappeFromLinkedIn(title: str, ort: str):
    print("Geht")
    jobs = []
    driver = uc.Chrome(use_subprocess=False)
    driver.get(f"https://www.linkedin.com/jobs/search?keywords={title}&location={ort}&geoId=&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0")
    print(driver.current_url)
    time.sleep(5)
    driver.execute_script("document.elementFromPoint(100, 100).click();")
    try:
      button = driver.find_element(By.CSS_SELECTOR, "button.modal__dismiss[aria-label='Verwerfen']")
      button.click()
    except:
        print("Error")
    last_height = driver.execute_script("return document.body.scrollHeight")
    while True:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1)
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height
        driver.execute_script("window.scrollTo(0, 0);")
    
    elements = driver.find_elements(By.CSS_SELECTOR,"div.base-card.relative.w-full")
    for element in elements:
        try:
            title = element.find_element(By.CSS_SELECTOR,".base-search-card__title").text
        except:
            title  = "Unknown"

        try:
            company = element.find_element(By.CSS_SELECTOR,".hidden-nested-link").text
        except: 
            company = "Unknown"

        try:
            url = element.find_element(By.CSS_SELECTOR, "a[data-tracking-control-name='public_jobs_jserp-result_search-card']").get_attribute("href")
        except:
            url = "Unknown"
        
        time.sleep(1)
        element.click()
        time.sleep(2) 
        try:
            description_element = driver.find_element(By.CSS_SELECTOR, ".show-more-less-html__markup.relative.overflow-hidden")
            description = description_element.text
            print(description)
        except:
            print("Could not find description element")

        x = job(title, company, url, "Unknown", "Unknown", description)
        jobs.append(x)
    time.sleep(2)
    y = Cached(jobs, title, ort)
    cache.append(y)
    driver.quit() 
    return jobs

def scrappeFromIndeed(title: str, ort: str):
    jobs = []
    driver = uc.Chrome(use_subprocess=False)
    driver.get(f"https://www.indeed.com/jobs?q={title}&l={ort}&from=searchOnDesktopSerp&cf-turnstile-response=0.uZjJoV5yM4swLgPLGPd53mE5oiqVJ1cTZttoxMO_mqlJDVoMQJTrBy0Jwaw2vtZhi94Gk-zQfF9r5VfDBAnwO9DCrYOxnHq_wU85AnL9WY-MSDMryoxQXgxKT1jMnf_aEuLIsDX3q13ZmDU6pl2epzPCeF6s-6BUi5lQi4gnpVrj_SwmgNZgXf9KG6aFPU9lv61OJu9K59JaioqX18aOSahiVhjlTNDrA2-DY0zyxgsPPQbDcIpfwVz1H6AGfzFFgL4X9WghWBP90JkqHiOetdemM7qBl-z7mKJne58NGtFF834OS7lGVVHJcJhE2qCVZyGdCvDDwkVNLW4c7Zw262iJEKlPyh2rte6Vlu4fLDyqAO00X6yW6YKqmMTTWw9M_25ro-bp5tEKlenKJay53pmWsYp3TS0LH_T9nYZhsmJ4bnRF3-EwofGQHziJ0QUtBoBaZR-3BB3EMBfgkztAAw8ISMSCLo-rU1685i45xHozuEhQE9t5wZ8ciDejOyZ_yg7L641_wsunQ6hjJ_Mda7y6IP3uB5F2TvO0BO0fwZ_lSjJxmvps3eNigH8fUiTnZvJr2br-kUOXvwFZnlxadAWhJ0iQoBJYWU6w56jk_kLJdNTVEXXt4IjHt-hmEbiK9yLCnV2-OYq9MGyLw9uPrKx5BTuxVMylcW4MS3jnG7N3EJizCJVEpmBXfzn21qTGwWV4c2StVGQCQ5inq5Co2DpiXtww9ko-7ZiD1Nkk8Dzot6E1nlCYKYWKtJoTwZQ48rZQai1EsayRd8GlyUvS-Qwj_9VfvUqnfH1x7A9Qn3ldycpSKW8j8NG2U_M0jbwkFc63Ps3ILDDiwyexN_Ypww.FpMTOfJ"
    "_5GJrGOQhAx2v8A.d24cd58f703be308180c3fe29dff81a112acbef361f56718dbba5274612a51ec&vjk=c237711b18542f69")
    print(driver.current_url)
    time.sleep(10)  
    print(driver.title)
    notatend = True
    while notatend :
      if len(jobs) > 80:
          notatend = False
          break
      elements = driver.find_elements(By.CSS_SELECTOR,".cardOutline.tapItem.dd-privacy-allow.result")
    
      for element in elements:
            Jobtitle = element.find_element(By.CSS_SELECTOR,"h2.jobTitle span").text
            company = element.find_element(By.CSS_SELECTOR,"span[data-testid='company-name']").text
            url = element.find_element(By.CSS_SELECTOR,"a[data-jk]").get_attribute("href")
            element.click()
            time.sleep(2.5)
            try:
                newElement = driver.find_element(By.CSS_SELECTOR, ".jobsearch-JobComponent.css-1kw92ky.eu4oa1w0")
            except Exception as e:
                print(f"An error occurred: {e}")
            try:
                payment = newElement.find_element(By.CSS_SELECTOR, "li[data-testid='list-item']").text
            except Exception as e:
                payment = "Unknown"
            if "$" not in payment:
                payment = "Unknown"
            try:
                JobType = newElement.find_element(By.CSS_SELECTOR,"[data-testid='Full-time-tile']").text
            except Exception as e:
                JobType = "Unknown"

            description = newElement.find_element(By.CSS_SELECTOR,".jobsearch-JobComponent-description.css-wppltw.eu4oa1w0").text
                
  
            print(payment)
            x = job(Jobtitle, company, url, payment, JobType, description)
            jobs.append(x)
      try:
         nextpage = driver.find_element(By.CSS_SELECTOR, 'a[data-testid="pagination-page-next"]')
         if nextpage:
            nextpage.click()
            time.sleep(3)
      except Exception as e:
         notatend = False   
         

    y = Cached(jobs, title, ort)
    cache.append(y)
    time.sleep(2)  
    driver.quit()
    return jobs
 

@app.post("/ScrappeJobsFromIndeed")
def ScrappeJobsFromIndeed(request: jobRequest):
    for x in cache[:]:
       if (x.created + 2200) <  int(time.time()):
          cache.remove(x)
    for x in cache:
        print(x.title)
        print(x.ort)
        print(cache)
        if x.title == request.title and x.ort == request.ort:
            return x.arr
    return scrappeFromIndeed(request.title, request.ort)



@app.post("/download/all/links")
def downloadAllLinks(jobs: List[Job]):
   downloadAllJobLinks(jobs);

@app.post("/generate/perfect/Resume")
def GeneratePerfectResume(request: ResumeRequest):
    generatePerfectResume(request)

@app.post("/scrapeJobsFromLinkedIn")
def ScrapeJobsFromLinkedIn(request: jobRequest):
    for x in cache[:]:
       if (x.created + 2200) <  int(time.time()):
          cache.remove(x)
    for x in cache:
        print(x.title)
        print(x.ort)
        print(cache)
        if x.title == request.title and x.ort == request.ort:
            return x.arr
    return scrappeFromLinkedIn(request.title, request.ort)

if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)


