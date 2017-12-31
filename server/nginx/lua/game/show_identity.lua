local json = require("cjson")

--解析POST参数
ngx.req.read_body()
arg = ngx.req.get_post_args()
local room_id = arg['room_id']
local nickName = arg['nickName']

ngx.header.content_type="text/plain";
ngx.log(ngx.DEBUG, "room_id:", room_id)


--连接redis
local redis = require "resty.redis"
local red = redis:new()
red:set_timeout(1000) -- 1 sec
local ok, err = red:connect("127.0.0.1", 6379)
if not ok then
    ngx.log(ngx.ERR, "failed to connect:", err)
    return
end

res, err = red:get(room_id)
if not res then
    ngx.log(ngx.ERR, "failed to get room:", room_id, err)
return
end

local room_info = json.decode(res)

--获得我的身份
local my_identity = nil
for k,member in pairs(room_info.members) do
    if  member.nickName == nickName then
        my_identity = member.identity
        ngx.log(ngx.DEBUG, "get my identity ", my_identity)
        break
    end
end


local identity_img_cfg = {
    ["police"] = '/img/identity/police.jpeg',
    ["bandit"] = '/img/identity/bandit.jpg',
    ["civilian"] = '/img/identity/civilian.jpeg',
    ["judge"] = '/img/identity/judge.jpg'
}

--返回房间信息
ret_msg = {
    ret = 0, 
    msg = "succ", 
    identity_img = identity_img_cfg[my_identity or 'judge' ]
}

local json = require("cjson")
ngx.say(json.encode(ret_msg));



