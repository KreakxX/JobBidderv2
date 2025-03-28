"use client";

import type React from "react";

import {
  Search,
  MapPin,
  DollarSign,
  Building,
  MapIcon,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Home,
  RefreshCw,
  BarChart3,
  ArrowDown,
  Clock,
  Star,
  StarOff,
  Bookmark,
  Share2,
  Clipboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import type { JobOffer } from "./JobOffer";

import { toast, Toaster } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { automaticallyApplyForJob, scrapeJobsFromIndeed } from "./api";

const Page: React.FC = () => {
  const [jobName, setJobName] = useState<string>("");
  const [jobLocation, setJobLocation] = useState<string>("");
  const [gehalt, setGehalt] = useState<number>(0);
  const [scrappedJobs, setScrappedJobs] = useState<JobOffer[]>([]);
  const [resultCount, setResultCount] = useState<number>(0);
  const [homeOffice, setHomeOffice] = useState<boolean>(false);
  const [gehaltBool, setGehaltBool] = useState<boolean>(false);
  const [stepstone, setStepstone] = useState<boolean>(true);
  const [agentur, setAgentur] = useState<boolean>(true);
  const [xing, setXing] = useState<boolean>(true);
  const [averageSalary, setAverageSalary] = useState<string>("");
  const [expandedJobs, setExpandedJobs] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);

  const toggleDescription = (index: number) => {
    setExpandedJobs((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const ScrapeJobsFromIndeed = async () => {
    try {
      const response = await scrapeJobsFromIndeed(jobName, jobLocation);
      setScrappedJobs(response);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-gray-100">
      <Toaster position="top-right" />

      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-4 max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-purple-600 rounded-full p-2">
                <img
                  className="w-8 h-8"
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

      <section className="py-12 bg-gradient-to-b from-gray-900 to-gray-900/70">
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

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-700/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  onChange={(e) => setJobName(e.target.value)}
                  placeholder="Job title or keyword"
                  className="pl-9 bg-gray-900/50 border-gray-700 text-gray-200 placeholder:text-gray-500 focus:border-purple-500"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Location"
                  className="pl-9 bg-gray-900/50 border-gray-700 text-gray-200 placeholder:text-gray-500 focus:border-purple-500"
                  onChange={(e) => setJobLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-center mb-6 w-full">
              <div className="flex justify-center items-center space-x-20">
                <div className="flex items-center justify-center space-x-2">
                  <Switch
                    id="Indeed"
                    checked={stepstone}
                    onCheckedChange={setStepstone}
                    className="data-[state=checked]:bg-purple-600"
                  />
                  <Label
                    htmlFor="Indeed"
                    className="text-sm font-medium text-gray-300"
                  >
                    Indeed
                  </Label>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Switch
                    id="LinkedIn"
                    checked={xing}
                    onCheckedChange={setXing}
                    className="data-[state=checked]:bg-purple-600"
                  />
                  <Label
                    htmlFor="LinkedIn"
                    className="text-sm font-medium text-gray-300"
                  >
                    LinkedIn
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <Button
                onClick={() => {
                  ScrapeJobsFromIndeed();
                }}
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

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white"
                    disabled={isLoading}
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Salary Insights
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-gray-800 border-gray-700 text-gray-100">
                  <DialogHeader>
                    <DialogTitle className="text-gray-100">
                      Salary Insights
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Average salary for {jobName || "this position"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-6">
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                      </div>
                    ) : averageSalary ? (
                      <div className="text-center">
                        <span className="text-3xl font-bold text-purple-400">
                          {averageSalary}
                        </span>
                        <p className="text-gray-400 mt-2">
                          Based on current market data
                        </p>
                      </div>
                    ) : (
                      <p className="text-center text-gray-400">
                        No salary data available
                      </p>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center">
          <h3 className="text-xl font-semibold text-gray-100 text-center mr-8">
            {resultCount > 0
              ? `${resultCount} Jobs Found`
              : "Start your search"}
          </h3>
          {resultCount > 0 && (
            <p className="text-gray-400">
              Showing results for {jobName || "all positions"}
            </p>
          )}
        </div>

        {resultCount > 0 && (
          <div className="flex justify-center items-center">
            <ArrowDown className="animate-bounce mt-5 w-8 h-8 text-purple-400"></ArrowDown>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[...Array(6)].map((_, i) => (
              <Card
                key={i}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg"
              >
                <CardHeader>
                  <div className="h-6 bg-gray-700 rounded-md w-3/4 animate-pulse"></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-700 rounded-md w-1/2 animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded-md w-1/3 animate-pulse"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-700 rounded-md w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded-md w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded-md w-2/3 animate-pulse"></div>
                  </div>
                  <div className="pt-4">
                    <div className="h-10 bg-gray-700 rounded-md w-full animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : scrappedJobs.length > 0 ? (
          <Tabs defaultValue="grid" className="mb-6 mt-8">
            <div className="flex justify-end">
              <TabsList className="mb-4 bg-gray-800 border border-gray-700">
                <TabsTrigger
                  value="grid"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-white"
                >
                  Grid View
                </TabsTrigger>
                <TabsTrigger
                  value="list"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-white"
                >
                  List View
                </TabsTrigger>
              </TabsList>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-600">
              Download all Job Links
            </Button>

            <TabsContent value="grid">
              <ScrollArea className="h-[calc(100vh-400px)] w-full pr-4">
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
                        className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg hover:shadow-purple-900/20 transition-all duration-300 overflow-hidden"
                      >
                        <CardHeader className="pb-2 relative">
                          <CardTitle className="text-lg font-bold line-clamp-2 text-gray-100 pr-8">
                            {job.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <p className="flex items-center gap-2 text-sm text-gray-300">
                              <Building className="h-4 w-4 text-gray-400" />
                              <span className="font-medium">{job.company}</span>
                            </p>

                            {job.payment && (
                              <p className="flex items-center gap-2 text-sm text-gray-300">
                                <DollarSign className="h-4 w-4 text-gray-400" />
                                <span className="text-purple-400 font-medium">
                                  {job.payment}
                                </span>
                              </p>
                            )}
                            {job.JobType && (
                              <p className="flex items-center gap-2 text-sm text-gray-300">
                                <Home className="h-4 w-4 text-gray-400" />
                                <span>{job.JobType}</span>
                              </p>
                            )}
                          </div>
                          <Separator className="bg-gray-700" />
                          <div className="space-y-2">
                            <p className="text-sm text-gray-300">
                              {isExpanded ? job.description : shortDescription}
                            </p>
                            {job.description.length > 150 && (
                              <Button
                                onClick={() => toggleDescription(index)}
                                variant="ghost"
                                size="sm"
                                className="p-0 h-auto text-purple-400 hover:text-purple-300 font-medium flex items-center"
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
                              View Job
                            </a>
                          </Button>
                          <Button
                            onClick={() => {
                              automaticallyApplyForJob();
                            }}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                            asChild
                          >
                            <h1>
                              <Clipboard className="mr-2 h-4 w-4" />
                              Apply for Job
                            </h1>
                          </Button>
                          <div className="flex justify-between items-center">
                            <Badge
                              variant="outline"
                              className="text-xs bg-gray-900/50 text-gray-300 border-gray-700"
                            >
                              {job.JobType}
                            </Badge>
                          </div>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="list">
              <ScrollArea className="h-[calc(100vh-400px)] w-full pr-4">
                <div className="space-y-4">
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
                        className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg hover:shadow-purple-900/20 transition-all duration-300 overflow-hidden"
                      >
                        <div className="flex flex-col md:flex-row md:items-center p-6">
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-lg font-bold text-gray-100 mr-2">
                                {job.title}
                              </h3>
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-2 mb-3">
                              <p className="flex items-center gap-2 text-sm text-gray-300">
                                <Building className="h-4 w-4 text-gray-400" />
                                <span>{job.company}</span>
                              </p>

                              {job.payment && (
                                <p className="flex items-center gap-2 text-sm text-gray-300">
                                  <DollarSign className="h-4 w-4 text-gray-400" />
                                  <span className="text-purple-400 font-medium">
                                    {job.payment}
                                  </span>
                                </p>
                              )}
                              <p className="flex items-center gap-2 text-sm text-gray-300">
                                <Clock className="h-4 w-4 text-gray-400" />
                                <span>Posted recently</span>
                              </p>
                            </div>
                            <p className="text-sm text-gray-300 mb-3">
                              {isExpanded ? job.description : shortDescription}
                            </p>
                            {job.description.length > 150 && (
                              <Button
                                onClick={() => toggleDescription(index)}
                                variant="ghost"
                                size="sm"
                                className="p-0 h-auto text-purple-400 hover:text-purple-300 font-medium flex items-center"
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
                          <div className="mt-4 md:mt-0 md:ml-4 flex flex-col gap-3 md:w-48">
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
                                View Job
                              </a>
                            </Button>
                            <div className="flex justify-between items-center">
                              <Badge
                                variant="outline"
                                className="text-xs bg-gray-900/50 text-gray-300 border-gray-700"
                              >
                                {job.JobType}
                              </Badge>
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
