import axios from "axios";
import { JobOffer } from "./JobOffer";


const api = axios.create({
  baseURL: "http://localhost:8000", 
});

export const scrapeJobsFromIndeed = async(title: string, ort: string) =>{
  try{
    const response = await  api.post("/ScrappeJobsFromIndeed", {title, ort})
    return response.data;
  }catch(error){
    console.log(error);
    throw error;

  }
}

export const downloadAllJobLinks = async(jobs: JobOffer[]) =>{
  try{
    await api.post("/download/all/links",jobs)
  }catch(error){
    console.log(error);
    throw error;
  }
}

export const downloadJobsFromLinkedIn = async(title: string, ort: string) =>{
  try{
    const response = await api.post("/scrapeJobsFromLinkedIn", {title, ort})
    return response.data;
  }catch(error){
    console.log(error);
    throw error;
  }
}

export const generatePerfectResume = async (request: {
  vorname: string;
  nachname: string;
  Birtday: string;
  BirthPlace: string;
  Nationality: string;
  marital: string;
  educationDate1: string;
  educationDate2: string;
  educationDate3: string;
  trainingDate1: string;
  trainingDate2: string;
  trainingDate3: string;
  education1: string;
  education2: string;
  education3: string;
  training1: string;
  training2: string;
  training3: string;
  language1: string;
  language2: string;
  language3: string;
  programming1: string;
  programming2: string;
  programming3: string;
  programming4: string;
  programming5: string;
  programming6: string;
  programming7: string;
  programming8: string;
  programming9: string;
  datum: string;
  ort: string;
}) =>{
  try{
    await api.post("/generate/perfect/Resume",request)
  }catch(error){
    console.log(error);
    throw error;
  }
}