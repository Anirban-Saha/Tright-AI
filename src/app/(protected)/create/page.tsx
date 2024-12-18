"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { api } from './../../../trpc/react';
import { toast } from "sonner";
import { z } from "zod";
import useRefetch from './../../../hooks/use-refetch';


type FormInput = {
  repoUrl: string;
  projectName: string;
  githubToken?: string;
};
const CreatePage = () => {
  const { register, handleSubmit, reset } = useForm<FormInput>();
  const createProject= api.project.createProject.useMutation();
  const refetch=useRefetch()
  // src/app/(protected)/create/page.tsx
// src/app/(protected)/create/page.tsx
function onSubmit(data:FormInput) {
  createProject.mutate({
    githubUrl: data.repoUrl,
    name: data.projectName,
    githubToken: data.githubToken
  }, {
    onSuccess: () => {
      toast.success('Project creation successful')
      refetch()
      reset()
    },
    onError: (error) => {
      // If user not found, redirect to sync-user page
      if (error.message.includes('user not found')) {
        window.location.href = '/sync-user';
        return;
      }
      toast.error('Failed to create project: ' + error.message)
    }
  })
}
  return (
    <div className="flex h-full items-center justify-center gap-12">
      <img src="/createImg.svg" className="h-56  w-auto" />
      <div>
        <div>
          <h1 className="text-2xl font-semibold">
            Link your Github Repository
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter the URL of your repository to link it to Tright!
          </p>
        </div>
        <div className="h-4"></div>
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                {...register('projectName',{required:true}) }
                placeholder='Project Name'
                required
                />
                <div className="h-2"></div>
                <Input
                {...register('repoUrl',{required:true}) }
                placeholder='Github Url'
                type='url'
                required
                />
                <div className="h-2"></div>
                <Input
                {...register('githubToken') }
                placeholder='Github Token'
               
                />
                <div className="h-4"></div>
                <Button type="submit" disabled={createProject.isPending}>
                    Create Project
                </Button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
