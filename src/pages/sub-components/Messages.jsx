import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SpecialLoadingButton from "./specialLoadingButton";
import { clearAllMessageErrors, deleteMessage, getAllMessages, resetMessageSlice } from "@/store/slices/messagesSlice";
import { toast } from "react-toastify";

const Messages = () => {

  const navigateTo = useNavigate();

  const handleReturnToDashboard = () => {
    navigateTo("/");
  }

  const {loading, messages, error, message} = useSelector(state => state.messages);
  const [ messageId, setMessageId] = useState("");

  const dispatch = useDispatch();
  const handleMessageDelete = (id) => {
    setMessageId(id);
    dispatch(deleteMessage(id));
  }

  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(clearAllMessageErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetMessageSlice());
      dispatch(getAllMessages());
    }
  },[dispatch, error, message, loading]);

  return (
     <>
      <div className="min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-20">
        <Tabs>
          <TabsContent>
            <Card>
              <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-6 p-6 bg-gray-100 rounded-xl shadow-lg">
                  {messages && messages.length > 0 ? (
                    messages.map((element) => {
                      return (
                        <Card
                          key={element._id}
                          className="p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
                        >
                          <CardDescription className="text-slate-950 mb-4">
                            <span className="font-bold mr-2 text-lg text-indigo-600">Sender Name:</span>
                            <span className="text-gray-700">{element.senderName}</span>
                          </CardDescription>
                          <CardDescription className="text-slate-950 mb-4">
                            <span className="font-bold mr-2 text-lg text-indigo-600">Subject:</span>
                            <span className="text-gray-700">{element.subject}</span>
                          </CardDescription>
                          <CardDescription className="text-slate-950 mb-4">
                            <span className="font-bold mr-2 text-lg text-indigo-600">Message:</span>
                            <span className="text-gray-700">{element.message}</span>
                          </CardDescription>
                          <CardFooter className="flex justify-end">
                            {loading && messageId === element._id ? (
                              <SpecialLoadingButton width={"w-32"} content={"Deleting"} />
                            ) : (
                              <Button
                                className="w-32 px-4 py-2 bg-slate-950 text-white rounded-lg hover:bg-slate-700 transition-colors duration-300 ease-in-out"
                                onClick={() => handleMessageDelete(element._id)}
                              >
                                Delete
                              </Button>
                            )}
                          </CardFooter>
                        </Card>
                      );
                    })
                  ) : (
                    <CardHeader className="text-center text-gray-600 font-semibold">
                      No Messages Found!
                    </CardHeader>
                  )}
                </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>


     </>
  );
};

export default Messages;
