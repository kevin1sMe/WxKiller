--解析POST参数
ngx.req.read_body()
arg = ngx.req.get_post_args()
local nickName = arg['nickName']
local avatarUrl = arg['avatarUrl']
local gender = tonumber(arg['gender'])

ngx.header.content_type="text/plain";
--nax.say("nickName:", nickName)
--nax.say("avatarUrl:", avatarUrl)
--nax.say("gender:", gender)
ngx.log(ngx.INFO, "nickName:", nickName)


--连接redis
local redis = require "resty.redis"
local red = redis:new()
red:set_timeout(1000) -- 1 sec
local ok, err = red:connect("127.0.0.1", 6379)
if not ok then
    ngx.log(ngx.ERR, "failed to connect:", err)
    return
end

--生成room_id
local room_id = red:incr("max_room_id")
--nax.say("room_id:", room_id)

--玩家所在room建立映射, 先1:1
ok, err = red:set(nickName, room_id)
if not ok then
    --nax.say("failed to create room ", err)
    ngx.log(ngx.ERR, "failed to create room:", err)
    return
end
--nax.say("insert ", nickName, " to room_id:", room_id)

--将玩家加入到房间中
local json = require("cjson")
room_info = { room_id = room_id, members = {}}
member = { nickName =  nickName,
    avatarUrl =  avatarUrl,
    gender =  gender
}
--member_str = json.encode(member)
----nax.say("member_str:", member_str)
table.insert(room_info.members, member)

ok, err = red:set(room_id, json.encode(room_info))
if not ok then
    --nax.say("failed to create room ", err)
    ngx.log(ngx.ERR, "failed to create room:", err)
return
end
--nax.say("create room: ", ok)

--返回房间号
ret_msg = {
    ret = 0, 
    msg = "succ", 
    room_id = room_id
}

ngx.say(json.encode(ret_msg));



