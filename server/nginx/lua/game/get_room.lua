--解析POST参数
ngx.req.read_body()
arg = ngx.req.get_post_args()
local room_id = arg['room_id']

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

--返回房间信息
ret_msg = {
    ret = 0, 
    msg = "succ", 
    room_info = res
}

local json = require("cjson")
ngx.say(json.encode(ret_msg));



