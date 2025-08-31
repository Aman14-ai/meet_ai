"use client";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, Search, User, Download, Sparkles } from "lucide-react";

const Page = () => {
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [startRoll, setStartRoll] = useState("");
  const [endRoll, setEndRoll] = useState("");
  const [photoUrl, setPhotoUrl] = useState<{ url: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Clear error when inputs change
    if (error) setError("");
  }, [year, branch, startRoll, endRoll]);

  const handleSubmit = async () => {
    if (!year || !branch || !startRoll || !endRoll) {
      setError("Please fill all fields");
      return;
    }

    const start = parseInt(startRoll);
    const end = parseInt(endRoll);
    
    if (isNaN(start) || isNaN(end) || start > end) {
      setError("Invalid roll number range");
      return;
    }
    
    if (end - start > 50) {
      setError("Maximum range is 50 students at a time");
      return;
    }

    setIsLoading(true);
    setError("");
    
    // Simulate network delay for better UX feedback
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const urls: { url: string }[] = [];
    for (let i = start; i <= end; i++) {
      urls.push({
        url: `https://erp.iitbbs.ac.in/photo/${year}${branch}010${i
          .toString()
          .padStart(2, "0")}.JPG`,
      });
    }
    
    setPhotoUrl(urls);
    setIsLoading(false);
  };

  const downloadAll = () => {
    photoUrl.forEach(photo => {
      const a = document.createElement('a');
      a.href = photo.url;
      a.download = photo.url.split("/").pop() || "photo.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-8 w-8 text-indigo-600" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Student Photo Gallery
            </h1>
            <Sparkles className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse student photos by selecting year, branch, and roll number range
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {/* Year Select */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Academic Year</label>
              <Select onValueChange={setYear} value={year}>
                <SelectTrigger className="w-full h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="20">2020</SelectItem>
                  <SelectItem value="21">2021</SelectItem>
                  <SelectItem value="22">2022</SelectItem>
                  <SelectItem value="23">2023</SelectItem>
                  <SelectItem value="24">2024</SelectItem>
                  <SelectItem value="25">2025</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Branch Select */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Branch</label>
              <Select onValueChange={setBranch} value={branch}>
                <SelectTrigger className="w-full h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all">
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="CE">Civil Engineering</SelectItem>
                  <SelectItem value="CS">Computer Science</SelectItem>
                  <SelectItem value="EC">Electronics & Communication</SelectItem>
                  <SelectItem value="EE">Electrical Engineering</SelectItem>
                  <SelectItem value="ME">Mechanical Engineering</SelectItem>
                  <SelectItem value="MM">Metallurgical Engineering</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Roll Inputs */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Roll Number Range</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Start"
                  value={startRoll}
                  onChange={(e) => setStartRoll(e.target.value.replace(/\D/g, ''))}
                  className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  type="number"
                  min="1"
                />
                <Input
                  placeholder="End"
                  value={endRoll}
                  onChange={(e) => setEndRoll(e.target.value.replace(/\D/g, ''))}
                  className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  type="number"
                  min="1"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              onClick={handleSubmit} 
              disabled={isLoading}
              className="h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Fetch Photos
                </>
              )}
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200 animate-pulse">
              {error}
            </div>
          )}
        </div>

        {/* Results Header */}
        {photoUrl.length > 0 && (
          <div className="flex justify-between items-center mb-6 animate-fade-in">
            <h2 className="text-2xl font-semibold text-gray-800">
              Results: <span className="text-indigo-600">{photoUrl.length}</span> students found
            </h2>
            
          </div>
        )}

        {/* Grid of Photos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {photoUrl.map((photo, index) => (
            <div
              key={photo.url}
              className="group flex flex-col items-center bg-white rounded-2xl shadow-sm p-3 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="relative overflow-hidden rounded-xl w-full aspect-square mb-2">
                <img
                  src={photo.url}
                  alt="Student"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YzZjZmOSIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSI0MCIgZmlsbD0iI2Q0ZDhkZiIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjE2MCIgcng9IjYwIiByeT0iNDAiIGZpbGw9IiNkNGQ4ZGYiLz48L3N2Zz4=";
                  }}
                />
                <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
              <span className="text-xs font-mono text-gray-500 truncate max-w-full">
                {photo.url.split("/").pop()}
              </span>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {photoUrl.length === 0 && !isLoading && (
          <div className="text-center py-20 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <User className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No photos to display</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Select year, branch, and roll number range to fetch student photos
            </p>
          </div>
        )}
      </div>

      {/* Add custom animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Page;