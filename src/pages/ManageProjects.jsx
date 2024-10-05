import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { clearAllProjectSliceErrors, deleteProject, getAllProjects, resetProjectSlice } from "@/store/slices/projectSlice";
import { Eye, Pen, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ManageProjects = () => {

  const {loading, error, message, projects} = useSelector((state) => state.project);

  const dispatch = useDispatch();

  const [newproficiency, setNewProficiency] = useState(1);

  const handleDeleteProject = (id) => {
    dispatch(deleteProject(id));
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectSliceErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  },[dispatch, error, loading, message]);
  


  return (
     <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Tabs>
          <TabsContent>
            <Card>
              <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
                <CardTitle>Manage Your Timeline</CardTitle> 
                <Link to={"/"}>
                  <Button>Return to Dashboard</Button>
                </Link>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Banner</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Stack</TableHead>
                      <TableHead>Deployed</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {
                      projects && projects.length > 0 ? (
                        projects.map(element => {
                          return (
                            <TableRow className="bg-accent" key={element._id}>
                              <TableCell>
                                <div>
                                  <img 
                                    src={element.projectBanner && element.projectBanner.url } 
                                    alt={element.title} 
                                    className="w-16 h-16" 
                                  />
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">{element.title}</TableCell>
                              <TableCell className="hidden md:table-cell">{element.stack}</TableCell>
                              <TableCell className="hidden md:table-cell">{element.deployed}</TableCell>
                              <TableCell className="flex felx-row items-center gap-3 h-24">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Link to={`/view/project/${element._id}`}>
                                      <button className="border-green-600 border-2 rounded-full h-8 w-8 flex
                                      justify-center items-center text-green-600 hover:text-slate-50 hover:bg-green-600">
                                        <Eye className="h-5 w-5" />
                                    </button>
                                      </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">
                                      View
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Link to={`/update/project/${element._id}`}>
                                      <button className="border-yellow-400 border-2 rounded-full h-8 w-8 flex
                                      justify-center items-center text-yellow-400  hover:text-slate-50 hover:bg-yellow-400 ">
                                        <Pen className="h-5 w-5" />
                                    </button>
                                      </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">
                                      Edit
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <button className="border-red-600 border-2 rounded-full h-8 w-8 flex
                                      justify-center items-center text-red-600 hover:text-slate-50 hover:bg-red-600">
                                        <Trash2 className="h-5 w-5" onClick={() => handleDeleteProject(element._id)} />
                                    </button>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">
                                      Delete
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </TableCell>
                            </TableRow>
                          )
                        })
                      ) : 
                      (
                        <TableRow>
                          <TableCell className="text-3xl overflow-y-hidden">
                            You Have Not Added Any Project
                          </TableCell>
                        </TableRow>
                      )
                    }
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
     </>
  );
};

export default ManageProjects;
