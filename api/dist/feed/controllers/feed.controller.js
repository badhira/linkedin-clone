"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
const feed_service_1 = require("../services/feed.service");
let FeedController = class FeedController {
    constructor(feedService) {
        this.feedService = feedService;
    }
    create(feedPost, req) {
        return this.feedService.createPost(req.user, feedPost);
    }
    findSelected(take = 1, skip = 1) {
        take = take > 20 ? 20 : take;
        return this.feedService.findPosts(take, skip);
    }
    update(id, feedPost) {
        return this.feedService.updatePost(id, feedPost);
    }
    delete(id) {
        return this.feedService.deletePost(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_2.Post)(),
    __param(0, (0, common_2.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], FeedController.prototype, "create", null);
__decorate([
    (0, common_2.Get)(),
    __param(0, (0, common_1.Query)('take')),
    __param(1, (0, common_1.Query)('skip')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], FeedController.prototype, "findSelected", null);
__decorate([
    (0, common_2.Put)(':id'),
    __param(0, (0, common_2.Param)('id')),
    __param(1, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], FeedController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_2.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], FeedController.prototype, "delete", null);
FeedController = __decorate([
    (0, common_2.Controller)('feed'),
    __metadata("design:paramtypes", [feed_service_1.FeedService])
], FeedController);
exports.FeedController = FeedController;
//# sourceMappingURL=feed.controller.js.map