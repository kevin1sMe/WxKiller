local json = require("cjson")

math.randomseed(os.time())

--解析POST参数
ngx.req.read_body()
arg = ngx.req.get_post_args()
local room_id = tonumber(arg['room_id'])
local judgeNickName = arg['nickName']


ngx.header.content_type="text/plain";
ngx.log(ngx.INFO, "room_id:", room_id, " start game", " judge is ", judgeNickName)

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

--人数下限搞一下
if #room_info.members < 2 then
    ngx.say("{ret: -1, msg:\"player too few\"}")
    ngx.exit(ngx.HTTP_OK)
    return
end

--随机各个身份
local identity_rule = {
    [1] = {police = 0, bandit = 0, civilian = 1 }, 
    [2] = {police = 0, bandit = 1, civilian = 1 },
    [3] = {police = 0, bandit = 1, civilian = 2 },
    [4] = {police = 0, bandit = 1, civilian = 3 },
    [5] = {police = 0, bandit = 2, civilian = 3 }, 

    --上面那些有毛线意义
    [6] = {police = 0, bandit = 2, civilian = 4 },
    [7] = {police = 0, bandit = 2, civilian = 5 }, 

    [8] = {police = 2, bandit = 2, civilian = 4 },
    [9] = {police = 2, bandit = 2, civilian = 5 },
    [10] = {police = 2, bandit = 2, civilian = 6 },

    [11] = {police = 3, bandit = 3, civilian = 5 },
    [12] = {police = 3, bandit = 3, civilian = 6 },
    [13] = {police = 3, bandit = 3, civilian = 7 },
    [14] = {police = 3, bandit = 3, civilian = 8 },

    [15] = {police = 4, bandit = 4, civilian = 7 },
    [16] = {police = 4, bandit = 4, civilian = 8 },
}

--第一个默认为法官，不给其分配身份
local player_id = {}
ngx.log(ngx.INFO, "total members:", #room_info.members)

for k, v in ipairs(room_info.members) do
    if room_info.members[k].nickName ~= judgeNickName then
        ngx.log(ngx.INFO, "insert join members[", k, "] = ", json.encode(room_info.members[k]))
        table.insert(player_id, k)
    else
        ngx.log(ngx.INFO, "skip judge, members[", k, "] = ", json.encode(room_info.members[k]))
    end
end

function shuffle(t)
    if type(t)~="table" then
        return
    end
    local l=#t
    local tab={}
    local index=1
    while #t~=0 do
        local n=math.random(0,#t)
        if t[n]~=nil then
            tab[index]=t[n]
            table.remove(t,n)
            index=index+1
        end
    end
    return tab
end

local shuffle_player = shuffle(player_id)
local game_rule = identity_rule[#shuffle_player]
ngx.log(ngx.INFO, "shuffle player length:", #shuffle_player, " game_rule", game_rule.police)

--按规则给所有玩家设置上身份
for k, player_idx in ipairs(shuffle_player) do
    --警
    if k <= game_rule.police then
        room_info.members[player_idx].identity = 'police'
    elseif k <= game_rule.police + game_rule.bandit then
        room_info.members[player_idx].identity = 'bandit'
    else
        room_info.members[player_idx].identity = 'civilian'
    end
end

ok, err = red:set(room_id, json.encode(room_info))
if not ok then
    ngx.log(ngx.ERR, "failed to join room:", err)
    return
end

--返回房间号
ret_msg = {
    ret = 0, 
    msg = "succ", 
    room_id = room_id
}

ngx.say(json.encode(ret_msg));



