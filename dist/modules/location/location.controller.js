"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocation = exports.updateLocation = exports.createLocation = exports.getLocation = exports.getLocations = void 0;
const location_service_1 = require("./location.service");
const asyncHandler_1 = require("../../utils/asyncHandler");
const apiResponse_1 = require("../../utils/apiResponse");
exports.getLocations = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    res.json((0, apiResponse_1.ok)(await location_service_1.locationService.getAll()));
});
exports.getLocation = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    res.json((0, apiResponse_1.ok)(await location_service_1.locationService.getById(req.params.id)));
});
exports.createLocation = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    res.status(201).json((0, apiResponse_1.ok)(await location_service_1.locationService.create(req.body), 'Location created'));
});
exports.updateLocation = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    res.json((0, apiResponse_1.ok)(await location_service_1.locationService.update(req.params.id, req.body), 'Location updated'));
});
exports.deleteLocation = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    await location_service_1.locationService.delete(req.params.id);
    res.json((0, apiResponse_1.ok)(null, 'Location deleted'));
});
