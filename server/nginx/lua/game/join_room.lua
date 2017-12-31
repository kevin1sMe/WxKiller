local json = require("cjson")

math.randomseed(os.time())

--解析POST参数
ngx.req.read_body()
arg = ngx.req.get_post_args()
local nickName = arg['nickName']
local avatarUrl = arg['avatarUrl']
local gender = tonumber(arg['gender'])
local room_id = tonumber(arg['room_id'])

--自己测试用，名称随机几个
nickName = tostring(math.random(1,100))..nickName

ngx.header.content_type="text/plain";
ngx.log(ngx.INFO, "nickName:", nickName, " room_id:", room_id)

--连接redis
local redis = require "resty.redis"
local red = redis:new()
red:set_timeout(1000) -- 1 sec
local ok, err = red:connect("127.0.0.1", 6379)
if not ok then
    ngx.log(ngx.ERR, "failed to connect:", err)
    return
end

local res, err = red:get(room_id)
if not res then
    ngx.log(ngx.ERR, "failed to get room:", room_id, err)
    return
end

ngx.log(ngx.DEBUG, "get room:", res)

local room_info = json.decode(res)

--FIXME 人数上限搞一下
--if #room_info.members > 10 then
    --ngx.say("{ret: -1, msg:\"full\"}")
    --ngx.exit(ngx.HTTP_OK)
    --return
--end

if #room_info.members < 16 then
    --将玩家加入到房间中
    local member = { nickName =  nickName,
        avatarUrl =  avatarUrl,
        gender =  gender
    }
    table.insert(room_info.members, member)

    ok, err = red:set(room_id, json.encode(room_info))
    if not ok then
        ngx.log(ngx.ERR, "failed to join room:", err)
        return
    end

    --记录玩家所在room
    ok, err = red:set(nickName, room_id)
    if not ok then
        --nax.say("failed to create room ", err)
        ngx.log(ngx.ERR, "failed to create room:", err)
        return
    end
end

--返回房间号
ret_msg = {
    ret = 0, 
    msg = "succ", 
    room_id = room_id
}

ngx.say(json.encode(ret_msg));



