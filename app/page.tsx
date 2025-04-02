"use client";

import type React from "react";
import { useState } from "react";
import {
  Search,
  MapPin,
  Building,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Home,
  RefreshCw,
  BarChart3,
  ArrowDown,
  Clipboard,
  Grid,
  List,
  File,
  CalendarIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toaster } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import type { JobOffer } from "./JobOffer";
import {
  downloadAllJobLinks,
  downloadJobsFromLinkedIn,
  generatePerfectResume,
  scrapeJobsFromIndeed,
} from "./api";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const Page: React.FC = () => {
  const [jobName, setJobName] = useState<string>("");
  const [jobLocation, setJobLocation] = useState<string>("");
  const [scrappedJobs, setScrappedJobs] = useState<JobOffer[]>([]);
  const [resultCount, setResultCount] = useState<number>(0);
  const [stepstone, setStepstone] = useState<boolean>(true);
  const [xing, setXing] = useState<boolean>(true);
  const [averageSalary, setAverageSalary] = useState<string>("");
  const [expandedJobs, setExpandedJobs] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);

  const [vorname, setVorname] = useState<string>("");
  const [nachname, setNachname] = useState<string>("");
  const [Birtday, setBirthday] = useState<string>("");
  const [BirthPlace, setBirthPlace] = useState<string>("");
  const [Nationality, setNationality] = useState<string>("");
  const [marital, setMarital] = useState<string>("");
  const [educationDate1, setEducationDate1] = useState<string>("");
  const [educationDate2, setEducationDate2] = useState<string>("");
  const [educationDate3, setEducationDate3] = useState<string>("");
  const [trainingDate1, setTrainingDate1] = useState<string>("");
  const [trainingDate2, setTrainingDate2] = useState<string>("");
  const [trainingDate3, setTrainingDate3] = useState<string>("");
  const [education1, setEducation1] = useState<string>("");
  const [education2, setEducation2] = useState<string>("");
  const [education3, setEducation3] = useState<string>("");
  const [training1, setTraining1] = useState<string>("");
  const [training2, setTraining2] = useState<string>("");
  const [training3, setTraining3] = useState<string>("");
  const [language1, setLanguage1] = useState<string>("");
  const [language2, setLanguage2] = useState<string>("");
  const [language3, setLanguage3] = useState<string>("");
  const [programming1, setProgramming1] = useState<string>("");
  const [programming2, setProgramming2] = useState<string>("");
  const [programming3, setProgramming3] = useState<string>("");
  const [programming4, setProgramming4] = useState<string>("");
  const [programming5, setProgramming5] = useState<string>("");
  const [programming6, setProgramming6] = useState<string>("");
  const [programming7, setProgramming7] = useState<string>("");
  const [programming8, setProgramming8] = useState<string>("");
  const [programming9, setProgramming9] = useState<string>("");
  const [datum, setDatum] = useState<string>("");
  const [ort, setOrt] = useState<string>("");
  const [indeed, setIndeed] = useState<boolean>();
  const [linkendIn, setLinkedIn] = useState<boolean>();

  const toggleDescription = (index: number) => {
    setExpandedJobs((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const scrapeJobs = async () => {
    try {
      setIsLoading(true);
      let indeedJobs = [];
      let linkedInJobs = [];
      indeedJobs = await scrapeJobsFromIndeed(jobName, jobLocation);
      linkedInJobs = await downloadJobsFromLinkedIn(jobName, jobLocation);
      const combinedResponse = [...indeedJobs, ...linkedInJobs];
      setScrappedJobs(combinedResponse);
      setResultCount(combinedResponse.length);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const GeneratePerfectResume = async () => {
    try {
      await generatePerfectResume({
        vorname,
        nachname,
        Birtday,
        BirthPlace,
        Nationality,
        marital,
        educationDate1,
        educationDate2,
        educationDate3,
        trainingDate1,
        trainingDate2,
        trainingDate3,
        education1,
        education2,
        education3,
        training1,
        training2,
        training3,
        language1,
        language2,
        language3,
        programming1,
        programming2,
        programming3,
        programming4,
        programming5,
        programming6,
        programming7,
        programming8,
        programming9,
        datum,
        ort,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100">
      <Toaster position="top-right" />

      <header className="border-b border-gray-800 bg-gray-950/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-4 max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-purple-600 rounded-full p-1">
                <img
                  className="w-12 h-12"
                  src="/Logo_for_Software_Jobfusion__a_platform_for_web_scraping_jobs-removebg-preview.png"
                  alt="JobFusion Logo"
                />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                JobFusion
              </h1>
            </div>
          </div>
        </div>
      </header>

      <section className="py-12">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Find Your Dream Job
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Search across multiple job platforms to find the perfect
              opportunity for your career
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700 absolute top-30 right-15">
                Generate Resume <File></File>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-gradient-to-b from-gray-950 to-gray-900 border-gray-800 text-white">
              <DialogHeader>
                <DialogTitle className="text-white">Personal Data</DialogTitle>
                <DialogDescription className="text-gray-300">
                  Please fill in all relevant fields.
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid grid-cols-5 mb-4 bg-gray-800">
                  <TabsTrigger
                    value="personal"
                    className="data-[state=active]:bg-purple-600 text-white"
                  >
                    Personal
                  </TabsTrigger>
                  <TabsTrigger
                    value="education"
                    className="data-[state=active]:bg-purple-600 text-white"
                  >
                    Education
                  </TabsTrigger>
                  <TabsTrigger
                    value="training"
                    className="data-[state=active]:bg-purple-600 text-white"
                  >
                    Training
                  </TabsTrigger>
                  <TabsTrigger
                    value="languages"
                    className="data-[state=active]:bg-purple-600 text-white"
                  >
                    Languages
                  </TabsTrigger>
                  <TabsTrigger
                    value="programming"
                    className="data-[state=active]:bg-purple-600 text-white"
                  >
                    Programming
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vorname" className="text-gray-200">
                        First Name
                      </Label>
                      <Input
                        id="vorname"
                        value={vorname}
                        onChange={(e) => setVorname(e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nachname" className="text-gray-200">
                        Last Name
                      </Label>
                      <Input
                        id="nachname"
                        value={nachname}
                        onChange={(e) => setNachname(e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="birthday" className="text-gray-200">
                        Date of Birth
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal bg-gray-800 border-gray-700",
                              !Birtday && "text-gray-400"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {Birtday
                              ? format(new Date(Birtday), "PPP")
                              : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                          <Calendar
                            mode="single"
                            selected={Birtday ? new Date(Birtday) : undefined}
                            onSelect={(date) =>
                              date && setBirthday(date.toISOString())
                            }
                            initialFocus
                            defaultMonth={new Date(2005, 0, 1)}
                            className="bg-gray-800 text-white"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birthPlace" className="text-gray-200">
                        Place of Birth
                      </Label>
                      <Input
                        id="birthPlace"
                        value={BirthPlace}
                        onChange={(e) => setBirthPlace(e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nationality" className="text-gray-200">
                        Nationality
                      </Label>
                      <Input
                        id="nationality"
                        value={Nationality}
                        onChange={(e) => setNationality(e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="marital" className="text-gray-200">
                        Marital Status
                      </Label>
                      <Select value={marital} onValueChange={setMarital}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Please select" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                          <SelectItem value="single">Single</SelectItem>
                          <SelectItem value="married">Married</SelectItem>
                          <SelectItem value="divorced">Divorced</SelectItem>
                          <SelectItem value="widowed">Widowed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                {/* Education */}
                <TabsContent value="education" className="space-y-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="educationDate1" className="text-gray-200">
                        Period 1
                      </Label>
                      <Input
                        id="educationDate1"
                        value={educationDate1}
                        onChange={(e) => setEducationDate1(e.target.value)}
                        placeholder="e.g. 2010-2014"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2 col-span-3">
                      <Label htmlFor="education1" className="text-gray-200">
                        Education 1
                      </Label>
                      <Input
                        id="education1"
                        value={education1}
                        onChange={(e) => setEducation1(e.target.value)}
                        placeholder="e.g. High School Diploma"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="educationDate2" className="text-gray-200">
                        Period 2
                      </Label>
                      <Input
                        id="educationDate2"
                        value={educationDate2}
                        onChange={(e) => setEducationDate2(e.target.value)}
                        placeholder="e.g. 2014-2018"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2 col-span-3">
                      <Label htmlFor="education2" className="text-gray-200">
                        Education 2
                      </Label>
                      <Input
                        id="education2"
                        value={education2}
                        onChange={(e) => setEducation2(e.target.value)}
                        placeholder="e.g. Bachelor in Computer Science"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="educationDate3" className="text-gray-200">
                        Period 3
                      </Label>
                      <Input
                        id="educationDate3"
                        value={educationDate3}
                        onChange={(e) => setEducationDate3(e.target.value)}
                        placeholder="e.g. 2018-2020"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2 col-span-3">
                      <Label htmlFor="education3" className="text-gray-200">
                        Education 3
                      </Label>
                      <Input
                        id="education3"
                        value={education3}
                        onChange={(e) => setEducation3(e.target.value)}
                        placeholder="e.g. Master in Computer Science"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* Training */}
                <TabsContent value="training" className="space-y-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="trainingDate1" className="text-gray-200">
                        Period 1
                      </Label>
                      <Input
                        id="trainingDate1"
                        value={trainingDate1}
                        onChange={(e) => setTrainingDate1(e.target.value)}
                        placeholder="e.g. 05/2021"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2 col-span-3">
                      <Label htmlFor="training1" className="text-gray-200">
                        Training 1
                      </Label>
                      <Input
                        id="training1"
                        value={training1}
                        onChange={(e) => setTraining1(e.target.value)}
                        placeholder="e.g. React Certification"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="trainingDate2" className="text-gray-200">
                        Period 2
                      </Label>
                      <Input
                        id="trainingDate2"
                        value={trainingDate2}
                        onChange={(e) => setTrainingDate2(e.target.value)}
                        placeholder="e.g. 08/2022"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2 col-span-3">
                      <Label htmlFor="training2" className="text-gray-200">
                        Training 2
                      </Label>
                      <Input
                        id="training2"
                        value={training2}
                        onChange={(e) => setTraining2(e.target.value)}
                        placeholder="e.g. AWS Cloud Practitioner"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="trainingDate3" className="text-gray-200">
                        Period 3
                      </Label>
                      <Input
                        id="trainingDate3"
                        value={trainingDate3}
                        onChange={(e) => setTrainingDate3(e.target.value)}
                        placeholder="e.g. 03/2023"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2 col-span-3">
                      <Label htmlFor="training3" className="text-gray-200">
                        Training 3
                      </Label>
                      <Input
                        id="training3"
                        value={training3}
                        onChange={(e) => setTraining3(e.target.value)}
                        placeholder="e.g. Scrum Master"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* Languages */}
                <TabsContent value="languages" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="language1" className="text-gray-200">
                      Language 1
                    </Label>
                    <Input
                      id="language1"
                      value={language1}
                      onChange={(e) => setLanguage1(e.target.value)}
                      placeholder="e.g. English (Native)"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language2" className="text-gray-200">
                      Language 2
                    </Label>
                    <Input
                      id="language2"
                      value={language2}
                      onChange={(e) => setLanguage2(e.target.value)}
                      placeholder="e.g. Spanish (Fluent)"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language3" className="text-gray-200">
                      Language 3
                    </Label>
                    <Input
                      id="language3"
                      value={language3}
                      onChange={(e) => setLanguage3(e.target.value)}
                      placeholder="e.g. French (Basic)"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </TabsContent>

                {/* Programming Languages */}
                <TabsContent value="programming" className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="programming1" className="text-gray-200">
                        Programming Language 1
                      </Label>
                      <Input
                        id="programming1"
                        value={programming1}
                        onChange={(e) => setProgramming1(e.target.value)}
                        placeholder="e.g. JavaScript"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="programming2" className="text-gray-200">
                        Programming Language 2
                      </Label>
                      <Input
                        id="programming2"
                        value={programming2}
                        onChange={(e) => setProgramming2(e.target.value)}
                        placeholder="e.g. TypeScript"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="programming3" className="text-gray-200">
                        Programming Language 3
                      </Label>
                      <Input
                        id="programming3"
                        value={programming3}
                        onChange={(e) => setProgramming3(e.target.value)}
                        placeholder="e.g. Python"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="programming4" className="text-gray-200">
                        Programming Language 4
                      </Label>
                      <Input
                        id="programming4"
                        value={programming4}
                        onChange={(e) => setProgramming4(e.target.value)}
                        placeholder="e.g. Java"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="programming5" className="text-gray-200">
                        Programming Language 5
                      </Label>
                      <Input
                        id="programming5"
                        value={programming5}
                        onChange={(e) => setProgramming5(e.target.value)}
                        placeholder="e.g. C#"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="programming6" className="text-gray-200">
                        Programming Language 6
                      </Label>
                      <Input
                        id="programming6"
                        value={programming6}
                        onChange={(e) => setProgramming6(e.target.value)}
                        placeholder="e.g. PHP"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="programming7" className="text-gray-200">
                        Programming Language 7
                      </Label>
                      <Input
                        id="programming7"
                        value={programming7}
                        onChange={(e) => setProgramming7(e.target.value)}
                        placeholder="e.g. SQL"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="programming8" className="text-gray-200">
                        Programming Language 8
                      </Label>
                      <Input
                        id="programming8"
                        value={programming8}
                        onChange={(e) => setProgramming8(e.target.value)}
                        placeholder="e.g. Ruby"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="programming9" className="text-gray-200">
                        Programming Language 9
                      </Label>
                      <Input
                        id="programming9"
                        value={programming9}
                        onChange={(e) => setProgramming9(e.target.value)}
                        placeholder="e.g. Go"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                    <div className="space-y-2">
                      <Label htmlFor="datum" className="text-gray-200">
                        Date
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal bg-gray-800 border-gray-700",
                              !datum && "text-gray-400"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {datum
                              ? format(new Date(datum), "PPP")
                              : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                          <Calendar
                            mode="single"
                            selected={datum ? new Date(datum) : undefined}
                            onSelect={(date) =>
                              date && setDatum(date.toISOString())
                            }
                            initialFocus
                            className="bg-gray-800 text-white"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ort" className="text-gray-200">
                        Location
                      </Label>
                      <Input
                        id="ort"
                        value={ort}
                        onChange={(e) => setOrt(e.target.value)}
                        placeholder="e.g. New York"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter className="mt-6">
                <Button
                  onClick={() => {
                    GeneratePerfectResume();
                  }}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-800/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  value={jobName}
                  onChange={(e) => setJobName(e.target.value)}
                  placeholder="Job title or keyword"
                  className="pl-9 bg-gray-800/50 border-gray-700 text-gray-200 placeholder:text-gray-500 focus:border-purple-500 focus-visible:ring-purple-500/20"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  value={jobLocation}
                  placeholder="Location"
                  className="pl-9 bg-gray-800/50 border-gray-700 text-gray-200 placeholder:text-gray-500 focus:border-purple-500 focus-visible:ring-purple-500/20"
                  onChange={(e) => setJobLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={scrapeJobs}
                className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Search Jobs
                  </>
                )}
              </Button>
            </div>
            <div className="flex justify-center mt-5"></div>
          </div>
        </div>
      </section>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        {resultCount > 0 ? (
          <div className="flex flex-col items-center mb-8">
            <h3 className="text-xl font-semibold text-gray-100 text-center mb-2">
              {resultCount} Jobs Found
            </h3>
            <p className="text-gray-400">
              Showing results for {jobName || "all positions"}
              {jobLocation ? ` in ${jobLocation}` : ""}
            </p>
            <ArrowDown className="animate-bounce mt-4 w-6 h-6 text-purple-400" />
          </div>
        ) : (
          !isLoading && (
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-gray-100">
                Start your search
              </h3>
            </div>
          )
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[...Array(6)].map((_, i) => (
              <Card
                key={i}
                className="bg-gray-900/60 backdrop-blur-sm border border-gray-800/50 shadow-lg"
              >
                <CardHeader>
                  <div className="h-6 bg-gray-800 rounded-md w-3/4 animate-pulse"></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-800 rounded-md w-1/2 animate-pulse"></div>
                    <div className="h-4 bg-gray-800 rounded-md w-1/3 animate-pulse"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-800 rounded-md w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-800 rounded-md w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-800 rounded-md w-2/3 animate-pulse"></div>
                  </div>
                  <div className="pt-4">
                    <div className="h-10 bg-gray-800 rounded-md w-full animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : scrappedJobs.length > 0 ? (
          <div className="space-y-6">
            <div className="flex justify-start items-center">
              <Button
                onClick={() => {
                  downloadAllJobLinks(scrappedJobs);
                }}
                className="bg-purple-600 hover:bg-purple-700"
                size="sm"
              >
                Download all Job Links
              </Button>
            </div>

            <Tabs defaultValue="grid" className="w-full flex  items-center">
              <TabsList className="bg-gray-800 border border-gray-700  ">
                <TabsTrigger
                  value="grid"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-300"
                >
                  <Grid className="h-4 w-4 mr-2" />
                  Grid
                </TabsTrigger>
                <TabsTrigger
                  value="list"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-300"
                >
                  <List className="h-4 w-4 mr-2" />
                  List
                </TabsTrigger>
              </TabsList>
              <TabsContent value="grid" className="mt-0">
                <ScrollArea className="h-[calc(100vh-320px)] w-full pr-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {scrappedJobs.map((job, index) => {
                      const isExpanded = expandedJobs[index] || false;
                      const isSaved = savedJobs.includes(index);
                      const shortDescription =
                        job.description.length > 150
                          ? job.description.substring(0, 150) + "..."
                          : job.description;

                      return (
                        <Card
                          key={index}
                          className="bg-gray-900/60 backdrop-blur-sm border border-gray-800/50 shadow-lg hover:shadow-purple-900/10 transition-all duration-300 overflow-hidden"
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-bold line-clamp-2 text-gray-100">
                              {job.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex flex-wrap gap-3">
                              <Badge
                                variant="outline"
                                className="bg-gray-800/50 text-gray-300 border-gray-700"
                              >
                                {job.JobType || "Full-time"}
                              </Badge>
                              {job.payment && (
                                <Badge className="bg-purple-900/50 text-purple-300 border-purple-800/50">
                                  {job.payment}
                                </Badge>
                              )}
                            </div>

                            <div className="space-y-2">
                              <p className="flex items-center gap-2 text-sm text-gray-300">
                                <Building className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                <span className="font-medium">
                                  {job.company}
                                </span>
                              </p>

                              {job.JobType && (
                                <p className="flex items-center gap-2 text-sm text-gray-300">
                                  <Home className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                  <span>{job.JobType}</span>
                                </p>
                              )}
                            </div>
                            <Separator className="bg-gray-800" />
                            <div className="space-y-2">
                              <p className="text-sm text-gray-300 leading-relaxed">
                                {isExpanded
                                  ? job.description
                                  : shortDescription}
                              </p>
                              {job.description.length > 150 && (
                                <Button
                                  onClick={() => toggleDescription(index)}
                                  variant="ghost"
                                  size="sm"
                                  className="p-0 h-auto text-purple-400 hover:text-purple-300 hover:bg-transparent font-medium flex items-center"
                                >
                                  {isExpanded ? (
                                    <>
                                      Show less{" "}
                                      <ChevronUp className="ml-1 h-3 w-3" />
                                    </>
                                  ) : (
                                    <>
                                      Read more{" "}
                                      <ChevronDown className="ml-1 h-3 w-3" />
                                    </>
                                  )}
                                </Button>
                              )}
                            </div>
                          </CardContent>
                          <CardFooter className="flex flex-col items-stretch gap-3 pt-0">
                            <Button
                              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                              asChild
                            >
                              <a
                                href={job.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Apply for Job
                              </a>
                            </Button>
                          </CardFooter>
                        </Card>
                      );
                    })}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="list" className="mt-0">
                <ScrollArea className="h-[calc(100vh-320px)] w-full pr-4">
                  <div className="space-y-4">
                    {scrappedJobs.map((job, index) => {
                      const isExpanded = expandedJobs[index] || false;
                      const shortDescription =
                        job.description.length > 150
                          ? job.description.substring(0, 150) + "..."
                          : job.description;

                      return (
                        <Card
                          key={index}
                          className="bg-gray-900/60 backdrop-blur-sm border border-gray-800/50 shadow-lg hover:shadow-purple-900/10 transition-all duration-300"
                        >
                          <div className="p-6  ">
                            <div className="flex flex-col md:flex-row md:items-start gap-6">
                              <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-100 mb-2">
                                  {job.title}
                                </h3>
                                <div className="flex flex-wrap gap-3 mb-3">
                                  <Badge
                                    variant="outline"
                                    className="bg-gray-800/50 text-gray-300 border-gray-700"
                                  >
                                    {job.JobType}
                                  </Badge>
                                  {job.payment && (
                                    <Badge className="bg-purple-900/50 text-purple-300 border-purple-800/50">
                                      {job.payment}
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
                                  <p className="flex items-center gap-2 text-sm text-gray-300">
                                    <Building className="h-4 w-4 text-gray-400" />
                                    <span>{job.company}</span>
                                  </p>
                                </div>
                                <Separator className="bg-gray-800 mb-4" />
                                <p className="text-sm text-gray-300 mb-3 leading-relaxed">
                                  {isExpanded
                                    ? job.description
                                    : shortDescription}
                                </p>
                                {job.description.length > 150 && (
                                  <Button
                                    onClick={() => toggleDescription(index)}
                                    variant="ghost"
                                    size="sm"
                                    className="p-0 h-auto text-purple-400 hover:text-purple-300 hover:bg-transparent font-medium flex items-center"
                                  >
                                    {isExpanded ? (
                                      <>
                                        Show less{" "}
                                        <ChevronUp className="ml-1 h-3 w-3" />
                                      </>
                                    ) : (
                                      <>
                                        Read more{" "}
                                        <ChevronDown className="ml-1 h-3 w-3" />
                                      </>
                                    )}
                                  </Button>
                                )}
                              </div>
                              <div className="flex flex-row md:flex-col gap-3 md:w-48">
                                <Button
                                  className="flex-1 md:w-full bg-purple-600 hover:bg-purple-700 text-white"
                                  asChild
                                >
                                  <a
                                    href={job.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Apply for Job
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center mt-8">
            <div className="rounded-full bg-purple-900/30 p-6 mb-4">
              <Search className="h-10 w-10 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-100">
              No jobs found
            </h3>
            <p className="text-gray-400 max-w-md">
              Try adjusting your search terms or click "Search Jobs" to see
              available positions
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
