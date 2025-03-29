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

export const automaticallyApplyForJob = async() =>{
  try{
   await api.post("/automatically/apply/Job")
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