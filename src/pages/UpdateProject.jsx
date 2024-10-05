import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { clearAllProjectSliceErrors, getAllProjects, resetProjectSlice, updateProject } from "@/store/slices/projectSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./sub-components/specialLoadingButton";
import { Button } from "@/components/ui/button";

const UpdateProject = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");

  const {error, message, loading} = useSelector((state) => state.project);
  const dispatch = useDispatch();

  const { id } = useParams();

  const handleProjectBannerPreview = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProjectBanner(file);
      setProjectBannerPreview(reader.result);
    }
  }

  useEffect(() => {
    const getProject = async() => {
      await axios.get(`https://mern-stack-portfolio-backend-code-8mnq.onrender.com/api/v1/project/get/${id}`,
        {
          withCredentials: true,
        }
      ).then((res) => {
        setTitle(res.data.project.title);
        setDescription(res.data.project.description);
        setStack(res.data.project.stack);
        setDeployed(res.data.project.deployed);
        setTechnologies(res.data.project.technologies);
        setGitRepoLink(res.data.project.gitRepoLink);
        setProjectLink(res.data.project.projectLink);
        setProjectBanner(res.data.project.projectBanner && res.data.project.projectBanner.url );
        setProjectBannerPreview(res.data.project.projectBanner && res.data.project.projectBanner.url );
      }).catch((error) => {
        toast.error(error.response?.data?.error);
      })
    }
    getProject();

    if (error) {
      toast.error(error);
      dispatch(clearAllProjectSliceErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }

  },[id, message, error, loading]);

  const descriptionInListFormat =description.split(". ");
  const technologiesInListFormat = technologies.split(", ");

  const handleUpdateProject = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("gitRepoLink", gitRepoLink);
    formData.append("projectLink", projectLink);
    formData.append("technologies", technologies);
    formData.append("stack", stack);
    formData.append("deployed", deployed);
    formData.append("projectBanner", projectBanner);
    dispatch(updateProject(id, formData));
  }

  return (
     <>
       <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
        <form className="w-[100%] px-5 md:w-[1000px]" onSubmit={handleUpdateProject} >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold leading-7 text-gray-900 text-3xl text-center">
                  UPDATE PROJECT
                </h2>
                <Link to={"/"}>
                  <Button>
                    Return to Dashboard
                  </Button>
                </Link>
              </div>
              <div className="mt-10 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <img 
                    src={projectBannerPreview ? projectBannerPreview : "./avatarHolder.jpg"}
                    alt="projectBanner"
                    className="w-full h-auto" 
                  />
                  <div className="relative">
                    <input 
                      type="file"
                      onChange={handleProjectBannerPreview}
                      className="avatar-update-btn mt-4 w-full"
                    />
                  </div>
                </div>
                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium loading-6 text-gray-900" >
                    Title
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-insert ring-gray-300
                    focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="text"
                        placeholder="Project Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900
                        placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>


                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium loading-6 text-gray-900" >
                    Description
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-insert ring-gray-300
                    focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <Textarea
                        placeholder="Feature 1. Feature 2. Feature 3."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                </div>


                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium loading-6 text-gray-900" >
                    Technologies Used In This Project
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-insert ring-gray-300
                    focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <Textarea
                        placeholder="Html, Css, Javascript, BootStrap"
                        value={technologies}
                        onChange={(e) => setTechnologies(e.target.value)}
                      />
                    </div>
                  </div>
                </div>


                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium loading-6 text-gray-900" >
                    Stack
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-insert ring-gray-300
                    focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <Select
                      value={stack}
                      onValueChange={(selectedValue) => setStack(selectedValue)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Project Stack" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Full Stack">Full Stack</SelectItem>
                          <SelectItem value="MERN">MERN</SelectItem>
                          <SelectItem value="MEAN">MEAN</SelectItem>
                          <SelectItem value="MEVN">MEVN</SelectItem>
                          <SelectItem value="NEXT.JS">NEXT.JS</SelectItem>
                          <SelectItem value="REACT.JS">REACT.JS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>


                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium loading-6 text-gray-900" >
                    Deployed
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-insert ring-gray-300
                    focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <Select
                      value={deployed}
                      onValueChange={(selectedValue) => setDeployed(selectedValue)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Is this project deployed?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>



                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium loading-6 text-gray-900" >
                    Github Repository Link
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-insert ring-gray-300
                    focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="text"
                        placeholder="Paste Your Github Repository Link Here"
                        value={gitRepoLink}
                        onChange={(e) => setGitRepoLink(e.target.value)}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900
                        placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>


                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium loading-6 text-gray-900" >
                    Project Link
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-insert ring-gray-300
                    focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="text"
                        placeholder="Paste Your Deployed Project Link Here"
                        value={projectLink}
                        onChange={(e) => setProjectLink(e.target.value)}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900
                        placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="flex justify-center w-full items-center">
              {loading ? (
                <SpecialLoadingButton
                  content={"Updating"}
                  width={"w-52"}
                />
              ) : (
                <button 
                  type="button" 
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                         focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2
                           mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none
                            dark:focus:ring-blue-800 w-52"
                            onClick={handleUpdateProject}>
                              Update
                  </button>
              )}
            </div>
          </form>
        </div>
     </>
  );
};

export default UpdateProject;
