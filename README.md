#Mock Builder

This project takes HTTP Archive Files (.har) and translates them into [Sinon.js](http://sinonjs.org/) Ajax Mocks.

Get the HAR files from the Chrome Developer Tools network panel.  After your browser has generated some traffic,
you can right click in the transaction log and select "Save as HAR with Content".  Save the files into the "hars"
subfolder.  This project translates those HAR files into Mock requests which could be useful for things like 
unit tests.  The translated mocks will be put into the "mocks" folder with the same name as the .har file.

##How to install

Install as a standard node package

    npm install

Using the command line from this folder, execute this command:

    grunt

This will enable the folder monitoring process, allowing new and changed .har files to be automatically 
translated into mocks.