# Permissions for Front and Back Repos

This document outlines the permissions for the front and back repositories.

## Front Repository

The front repository contains the user interface and client-side logic for the application. The following permissions apply:

- **Read**: All developers have read access to the front repository.
- **Write**: Only authorized developers have write access to the front repository.

## Back Repository

The back repository contains the server-side logic and database for the application. The following permissions apply:

- **Read**: Only authorized developers have read access to the back repository.
- **Write**: Only authorized developers have write access to the back repository.

## Communication between Repositories

The front and back repositories communicate through a REST API. The following permissions apply:

- **Read**: The front repository has read access to the REST API endpoints exposed by the back repository.
- **Write**: The back repository has write access to the database used by the REST API.
